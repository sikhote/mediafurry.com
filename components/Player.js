import React from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import { merge } from 'lodash';
import { Button, Slider, Switch, Icon } from 'antd';
import moment from 'moment';
import style from '../styles/player';
import getFileInDirection from '../lib/getFileInDirection';

class Player extends React.Component {
  goToFile(direction) {
    const { settings, files, filesGetLinkAndPlay } = this.props;
    const { path } = getFileInDirection(settings, files, direction);
    filesGetLinkAndPlay({ source: 'audio', path });
  }
  render() {
    const {
      settings,
      settingsReplace,
      settingsReplaceAndCloudSaveOther,
    } = this.props;
    const { player } = settings;
    const {
      volume,
      playing,
      muted,
      file = {},
      loop,
      played,
      playedSeconds,
    } = player;
    const { url, path } = file;

    const config = {
      loop,
      muted,
      width: '100%',
      height: '100%',
      progressInterval: 1000,
      // full screen
      playsinline: false,
      volume,
      playing,
      url,
      ref: ref => {
        this.player = ref;
      },
      onDuration: () => this.player.seekTo(played),
      onProgress: ({ played, playedSeconds }) =>
        settingsReplace(
          merge({}, settings, {
            player: { played, playedSeconds },
          }),
        ),
      onEnded: () => this.goToFile('next'),
    };

    return (
      <div className="root">
        <style jsx>{style}</style>
        <div className="easy-grid main">
          <div className="easy-grid directions">
            <Button
              size="small"
              disabled={!url}
              type="primary"
              shape="circle"
              icon="backward"
              onClick={() => this.goToFile('previous')}
            />
            <Button
              size="small"
              disabled={!url}
              type="primary"
              shape="circle"
              icon={playing ? 'pause' : 'caret-right'}
              onClick={() =>
                settingsReplaceAndCloudSaveOther(
                  merge({}, settings, {
                    player: { playing: !playing },
                  }),
                )
              }
            />
            <Button
              size="small"
              disabled={!url}
              type="primary"
              shape="circle"
              icon="forward"
              onClick={() => this.goToFile('next')}
            />
          </div>
          <div className="easy-grid controls">
            <div className="easy-grid control">
              <Icon type="sound" />
              <Switch
                size="small"
                checked={!muted}
                onChange={() =>
                  settingsReplaceAndCloudSaveOther(
                    merge({}, settings, {
                      player: { muted: !muted },
                    }),
                  )
                }
              />
              <Slider
                value={volume}
                min={0}
                max={1}
                step={0.01}
                tipFormatter={volume => `${Math.round(volume * 100)}%`}
                onChange={volume =>
                  settingsReplaceAndCloudSaveOther(
                    merge({}, settings, {
                      player: { volume },
                    }),
                  )
                }
              />
            </div>
            <div className="easy-grid control">
              <Icon type="retweet" />
              <Switch
                size="small"
                checked={loop}
                onChange={() =>
                  settingsReplaceAndCloudSaveOther(
                    merge({}, settings, {
                      player: { loop: !loop },
                    }),
                  )
                }
              />
              <Slider
                value={played}
                min={0}
                max={1}
                step={0.01}
                tipFormatter={() =>
                  moment(
                    // eslint-disable-next-line no-underscore-dangle
                    moment.duration(playedSeconds, 'seconds')._data,
                  ).format('mm:ss')
                }
                onChange={progress => this.player.seekTo(progress)}
              />
            </div>
          </div>
        </div>
        <div className="info">
          {path || 'Add credentials and play some media'}
        </div>
        <ReactPlayer {...config} />
      </div>
    );
  }
}

Player.propTypes = {
  files: PropTypes.object.isRequired,
  settingsReplace: PropTypes.func.isRequired,
  settingsReplaceAndCloudSaveOther: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
  filesGetLinkAndPlay: PropTypes.func.isRequired,
};

export default Player;
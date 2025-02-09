import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  View,
  Text,
  Platform
} from 'react-native';
import PropTypes from 'prop-types';

const checkIcon = require('./circle-check.png');

const styles = StyleSheet.create({
  marker: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'transparent',
  },
});

class ImageItem extends Component {
  componentWillMount() {
    let { width } = Dimensions.get('window');
    const { imageMargin, imagesPerRow, containerWidth } = this.props;

    if (typeof containerWidth !== 'undefined') {
      width = containerWidth;
    }
    this.imageSize = (width - (imagesPerRow + 1) * imageMargin) / imagesPerRow;
  }

  handleClick(item) {
    this.props.onClick(item);
  }

  render() {
    const {
      item, selected, selectedMarker, imageMargin, selectedIndex
    } = this.props;

    const marker = selectedMarker || (<View
        style={[styles.marker,
            {justifyContent: 'center', alignItems: 'center', backgroundColor: '#00a04a', borderRadius: 10, height: 20, width: 20}]}>
        <Text style={{color: 'white', fontSize: 12}}>{selectedIndex+1}</Text>
        </View>);

    const { image, group_name } = item.node;

    if (Platform.OS == 'ios') {
      if (group_name != 'All Photos') {
        return null;
      }
    }

    return (
      <TouchableOpacity
        style={{ marginBottom: imageMargin, marginRight: imageMargin }}
        onPress={() => this.handleClick(image)}
      >
        <Image
          source={{ uri: image.uri }}
          style={{ height: this.imageSize, width: this.imageSize }}
        />
        {(selected) ? marker : null}
      </TouchableOpacity>
    );
  }
}

ImageItem.defaultProps = {
  item: {},
  selected: false,
};

ImageItem.propTypes = {
  item: PropTypes.object,
  selected: PropTypes.bool,
  selectedIndex: PropTypes.number,
  selectedMarker: PropTypes.element,
  imageMargin: PropTypes.number,
  imagesPerRow: PropTypes.number,
  onClick: PropTypes.func,
};

export default ImageItem;

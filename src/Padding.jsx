import PropTypes from 'prop-types';

const Padding=({className,style,size})=>(<div className={className} style={{
  ...style,
  height:size,
}}/>);
Padding.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  size: PropTypes.string.isRequired
};

export default Padding;
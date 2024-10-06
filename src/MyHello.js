import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

MyHello.propTypes = {
  myName: PropTypes.string.isRequired
}

export default function MyHello({props}) {
  return (
    <div>こんにちは、{props.myName}さん！</div>
  )
}

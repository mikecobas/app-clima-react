import React from 'react';
import PropTypes from 'prop-types'

const Error = ({mensaje}) => {
    return ( <p className="red darken-2 error">No hay resultados</p> );
}
 
Error.propTypes = {
    error: PropTypes.string.isRequired
}
export default Error;
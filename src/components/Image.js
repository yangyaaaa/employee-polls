const Image = ({url, w}) => {
  return (<img src={url} style={{ width: w }}
    alt="Avatar" />)
}

export default Image;
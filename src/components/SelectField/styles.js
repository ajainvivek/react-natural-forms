import reactCSS from 'reactcss';

const styles = reactCSS({
  default: {
    dropdown: {
      background: '#fff',
      position: 'absolute',
      boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px',
      borderRadius: '2px',
      zIndex: 1
    },
    ul: {
      margin: '0',
      padding: '0'
    },
    li: {
      listStyle: 'none',
      fontSize: '34px',
      padding: '10px 20px'
    }
  }
});

export default styles;

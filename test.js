// find all headers in the document with the class 'big'
// and change the font size to 24pt when the mouse is over them
const resizeHeaderswhenMouseOver = () => {
  const headers = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  headers.forEach((header) => {
    header.addEventListener('mouseover', () => {
      header.style.fontSize = '24pt';
    });
    header.addEventListener('mouseout', () => {
      header.style.fontSize = '';
    });
  });
}
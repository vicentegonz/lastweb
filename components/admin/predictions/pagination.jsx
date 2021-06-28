import { render } from 'react-dom';
import {
  Pagination,
} from 'antd';

const listaItems = [];
for (let i = 0; i < 61; i += 1) {
  listaItems.push(i);
}

const locale = {
  prevText: '<',
  nextText: '>',
};

let state = 1;
let elemsForPage = 10;
let showElems = listaItems.slice((state - 1) * elemsForPage, elemsForPage * state);

const PaginationFrame = () => (
  <div>
    <div id="lista">
      {showElems}
    </div>

    <div style={{
      textAlign: 'center', position: 'absolute', width: '100%', bottom: window.innerHeight / 6,
    }}
    >
      <Pagination
        defaultCurrent={1}
        total={listaItems.length}
        locale={locale}
        onChange={(page, pageSize) => {
          state = page;
          elemsForPage = pageSize;
          showElems = listaItems.slice((state - 1) * elemsForPage, elemsForPage * state);
          render(showElems, document.getElementById('lista'));
        }}
        responsive
      />
    </div>
  </div>
);

export default PaginationFrame;

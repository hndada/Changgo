import type { FC } from "react";
// import HanjaLinker from "./hanja-linker";
// import JapaneseMeaningRenderer from "./japanese-meaning-renderer";
import styles from "./search-result.module.scss";
// import VocabularyTreeRenderer from "./vocabulary-tree-renderer";
import type { Entity } from "@/utilities/jlpt_with_examples.json";

type Props = {
  list: Entity[]
};

const SearchResult:FC<Props> = ({ list }) => <ul className={styles['list']}>
  {list && list.map((v, i) => <li key={i}>
    {/* <li key={v.entry+v.reading+v.meaning}> */}
    <table>
      <tbody>
        <tr>
          <td>
            {v['entry']}
          </td>
          <td>
            {v['examples'] ? v['examples'][0]['jp'] : ''}
          </td>
        </tr>
        <tr>
          <td>
            {v['pronunciation']}
          </td>
          <td>
            {v['examples'] ? v['examples'][0]['pronunciations']['join'](' ') : ' '}
          </td>
        </tr>
        <tr>
          <td>
            {v['level']}급
          </td>
          <td>
            {Boolean(v['examples']) && <audio controls>
              <source src={v['examples'] ? '/voice/' + v['examples'][0]['voice_file'] : ''} type="audio/mpeg" />
            </audio>}
          </td>
        </tr>
        <tr>
          <td>
            {v['meanings']['join'](', ')}
          </td>
          <td>
            {v['examples'] ? v['examples'][0]['kr'] : ' '}
          </td>
        </tr>
      </tbody>
    </table>
  </li>
  )
  }
</ul>;
export default SearchResult;
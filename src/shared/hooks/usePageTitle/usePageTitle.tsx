import {useEffect} from 'react';

type Props = {
  name: string
}

export const usePageTitle = ({name}: Props) => {
  /**
   * タイトルタグの内容を更新する
   */
  useEffect(() => {
    const today = (() => {
      const date = new Date();
      const year = date.getFullYear();
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const day = ('0' + date.getDate()).slice(-2);
      return `${year}${month}${day}`;
    })()
    document.title = `${today}_職務経歴書_${name}`;
  }, [name]);
}

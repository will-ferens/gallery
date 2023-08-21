import {
  highlightedBackgroundColor,
  highlightedFontColor,
  highlightedBorder,
  accentFontColor,
} from '../../styles/theme'
import { border } from '../../styles/constants';

import styled from 'styled-components';

export const HeaderContainer = styled.header`
  height: 75px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  padding: 0 20px;
  background: ${highlightedBackgroundColor};
  color: ${highlightedFontColor};
  border-bottom: ${border} ${highlightedBorder};
`;

export const HeaderTitle = styled.h1`
  margin: 0;
`;

export interface IGameTitle {
  title: string
}
const GameTitle = ({ title }: IGameTitle) => {
  return (
    <HeaderContainer>
      <HeaderTitle>{title}</HeaderTitle>
    </HeaderContainer>
  )
}

export default GameTitle;
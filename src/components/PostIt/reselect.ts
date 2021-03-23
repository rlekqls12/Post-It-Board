import { createSelector } from "reselect";
import { Props } from './index';

export const reselectProps = createSelector(
  (props: Props) => props,
  (props: Props) => props
)
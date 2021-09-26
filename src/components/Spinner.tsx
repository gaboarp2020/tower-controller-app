import {Spinner} from '@ui-kitten/components';
import React from 'react';

/**
 * @property {boolean} animating - Whether component is animating.
 * Default is *true*.
 *
 * @property {string} size - Size of the component.
 * Can be `tiny`, `small`, `medium`, `large`, or `giant`.
 * Defaults to *medium*.
 *
 * @property {string} status - Status of the component.
 * Can be `basic`, `primary`, `success`, `info`, `warning`, `danger` or `control`.
 * Defaults to *primary*.
 * Use *control* status when needed to display within a contrast container.
 */
export interface PropTypes {
  animating?: boolean;
  size?: 'giant' | 'large' | 'medium' | 'small' | 'tiny';
  status?:
    | 'basic'
    | 'control'
    | 'danger'
    | 'info'
    | 'primary'
    | 'success'
    | 'warning';
}

const CustomSpinner = ({
  animating = true,
  status = 'primary',
  size = 'medium',
}: PropTypes): React.ReactElement => (
  <Spinner animating={animating} status={status} size={size} />
);

export default CustomSpinner;

import { useEffect } from 'react';
import type { Decorator } from '@storybook/react-vite';

type ScriptInit = () => () => void;

export const withScript = (init: ScriptInit): Decorator =>
  function ScriptDecorator(Story) {
    useEffect(() => init(), []);
    return <Story />;
  };

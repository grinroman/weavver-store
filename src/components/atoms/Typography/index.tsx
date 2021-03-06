import clsx from 'clsx';
import React, { CSSProperties } from 'react';
import { Color } from 'src/Types/Color';
import styles from './typography.module.scss';

export type TypographyProps = {
    component?: React.ElementType;
    preset?:
        | 'common1'
        | 'common2'
        | 'common3'
        | 'common4'
        | 'common5'
        | 'common6'
        | 'common7'
        | 'title1'
        | 'title2'
        | 'title3'
        | 'title4'
        | 'title5'
        | 'saletitle1'
        | 'saletitle2'
        | 'undersaleinscript'
        | 'mainPrice1'
        | 'mainPrice2'
        | 'crossed1'
        | 'salemeasure1'
        | 'salecount'
        | 'header1'
        | 'label'
        | 'subtitle'
        | 'guide'
        | 'description'
        | 'tab'
        | 'category'
        | 'burger'
        | 'modaldescription'
        | 'listtitle1'
        | 'carouseltitle';
    color?: Color;
    style?: CSSProperties;
    align?: 'left' | 'center' | 'right';
    textCase?: 'upper' | 'lower' | 'none';
    className?: string;
};

export const Typography: React.FC<TypographyProps> = ({
    children,
    color = 'black',
    component = 'p',
    preset = 'common1',
    textCase = 'none',
    style,
    align,
    className: classNameFromProps,
}) => {
    const className = clsx(
        styles.root,
        styles[preset],
        styles[textCase],
        styles[color],
        styles[align!],
        classNameFromProps
    );

    return React.createElement(component, { style, className }, children);
};

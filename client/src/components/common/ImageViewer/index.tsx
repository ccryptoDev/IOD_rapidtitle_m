import React from 'react';

export default function ImageViewer({
  source,
  width,
  height,
  style = {},
  className = ''
}: {
  source: string;
  width: string | number;
  height: string | number;
  style?: object;
  className?: string;
}) {
  return (
    <img
      src={source}
      alt="indra jatra"
      width={width}
      height={height}
      style={style}
      className={className}
    />
  );
}

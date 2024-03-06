export const mergeStyles = (...styles) => {
    const flattened = styles.flat();
  
    return flattened.reduce((merged, style) => ({
      ...merged,
      ...style,
    }));
  };
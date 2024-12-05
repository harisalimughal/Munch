import React from 'react';
import styles from './RichTextEditor.module.css';

const RichTextEditor = ({ value, onChange }) => {
  return (
    <textarea
      className={styles.richTextEditor}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={10}
    />
  );
};

export default RichTextEditor;


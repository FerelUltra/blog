import React from 'react';
import styles from './Tags.module.css';
import {Tag} from '../../types'
interface TagsProps {
    tags: Tag[];
    addTag: () => void;
    deleteTag: (id: string) => void;
    changeTagValue: (value: string, id: string) => void;
}

export const Tags: React.FC<TagsProps> = ({ addTag, tags, deleteTag, changeTagValue }) => {
    const onChangeInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        changeTagValue(event.target.value, event.target.name);
    };
    return (
        <section className={styles.section}>
            <h2>Tags</h2>
            <div className={styles.tagsItems}>
                {tags.map((item, index) => (
                    <div className={styles.tagsItem}>
                        <input
                            onChange={onChangeInputValue}
                            name={item.id}
                            value={item.value}
                            className={styles.tagsInput}
                            placeholder="Tag"
                            type="text"
                        />
                        <button
                            disabled={tags.length === 1}
                            onClick={() => deleteTag(item.id)}
                            className={styles.delete}
                            type="button"
                        >
                            Delete
                        </button>
                        {tags.length - 1 === index && (
                            <button onClick={addTag} className={styles.add} type="button">
                                Add tag
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

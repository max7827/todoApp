import { Check, Trash,Pencil } from "phosphor-react";
import React from "react";
import styles from "./ListItem.module.css";



export default function ListItem({
  content,
  taskId,
  isDone,
  onDelete,
  onSelect,
  onEdit
}) {
  function handleDeleteTask() {
    onDelete(taskId);
  }
  function handleEditTask() {
    onEdit(taskId);
  }
  function handleSelectTask() {
    onSelect(taskId);
  }
  console.log('8888888888888888',taskId);
  return (
    <div className={styles.listItem}>
      <button
        className={
          isDone ? styles.listItemToggleSelected : styles.listItemToggle
        }
        onClick={handleSelectTask}
      >
        {isDone ? <Check size={24}></Check> : null}
      </button>
      <p className={isDone ? styles.listItemTextSelected : styles.listItemText}>
        {content}
      </p>
      <button
        className={styles.listItemDeleteButton}
        onClick={handleEditTask}
      >
      <Pencil size={24} />
      </button>
      <button
        className={styles.listItemDeleteButton}
        onClick={handleDeleteTask}
      >
        <Trash size={24}></Trash>
      </button>
    </div>
  );
}

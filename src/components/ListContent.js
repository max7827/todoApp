import { ClipboardText } from "phosphor-react";
import styles from "./ListContent.module.css";
import ListItem from "./ListItem";

// export interface IListContentProps {
//   tasks: ITask[];
//   onDelete: (taskId: string) => void;
//   onSelect: (taskId: string) => void;
// }

export default function ListContent({
  tasks,
  onDelete,
  onSelect,
  onEdit
}) {
  const createdTasksCount = tasks.length;
  const doneTasksCount = tasks.filter(
    (task) => task.isFinished === true
  ).length;

  console.log('--done----',tasks);
  console.log('---no done---',createdTasksCount);
  function onDeleteTaskProps(taskId) {
    onDelete(taskId);
  }

  function onSelectTaskProps(taskId) {
    onSelect(taskId);
  }
  function onEditTaskProps(taskId) {
    onEdit(taskId);
  }

  return (
    <div className={styles.listContent}>
      <header className={styles.listContentHeader}>
        <div className={styles.listCreatedTaskCounter}>
          Created Tasks
          <span>{createdTasksCount}</span>
        </div>
        <div className={styles.listDoneTaskCounter}>
          Done Tasks
          <span>
            {doneTasksCount} of {createdTasksCount}
          </span>
        </div>
      </header>
      {tasks.length === 0 ? (
        <div className={styles.emptyList}>
          <ClipboardText size={72}></ClipboardText>
          <strong>You don't have any tasks registered yet.</strong>
          <p>Create tasks and organize your to-do items</p>
        </div>
      ) : (
        <main className={styles.listItensContainer}>
         
          {tasks.map((content, id) => (
            <ListItem
              onDelete={onDeleteTaskProps}
              onSelect={onSelectTaskProps}
              onEdit={onEditTaskProps}
              key={id}
              taskId={id}
              content={content.name}
              isDone={content.isFinished}
            ></ListItem>
          ))}
        </main>
      )}
    </div>
  );
}

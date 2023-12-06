import firestore from "@react-native-firebase/firestore";

import { TaskModel } from "@models/task.model";
import { FilterType } from "../types/filterType";

interface LoadTasksResponse {
  tasks: TaskModel[];
  hasNextPage: boolean;
}

class TaskService {
  private collectionRef = firestore().collection("tasks");

  async getTaskById(taskId: string): Promise<TaskModel | null> {
    try {
      const doc = await this.collectionRef.doc(taskId).get();

      if (doc.exists) {
        return { id: doc.id, ...doc.data() } as TaskModel;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error getting task by ID:", error);
      throw error;
    }
  }

  async getTaskListWithParams(userId: string, filter: FilterType, pageSize: number, startAfter?: string | null): Promise<LoadTasksResponse> {
    try {

      let query = this.collectionRef
        .where("user_id", "==", userId)
        .orderBy("created_at", "desc")
        .limit(pageSize);

      if (filter !== 'All') {
        const doneValue = filter === 'Completed';
        query = query.where('done', '==', doneValue);
      }

      if (startAfter) {
        query = query.startAfter(startAfter);
      }

      const snapshot = await query.get();
      const tasks: TaskModel[] = [];

      snapshot.forEach((doc) => {
        tasks.push({ id: doc.id, ...doc.data() } as TaskModel);
      });

      const lastVisible = snapshot.docs[snapshot.docs.length - 1];
      const hasNextPage = !!lastVisible;

      return { tasks, hasNextPage };
    } catch (error) {
      console.error("Error getting tasks by user ID:", error);
      throw error;
    }
  }

  async addTask(newTask: TaskModel): Promise<string> {
    try {
      const docRef = await this.collectionRef.add(newTask);
      return docRef.id;
    } catch (error) {
      console.error("Error adding task:", error);
      throw error;
    }
  }

  async editTaskById(taskId: string, updatedTask: TaskModel): Promise<TaskModel> {
    try {
      await this.collectionRef.doc(taskId).update(updatedTask);
      const updatedDoc = await this.collectionRef.doc(taskId).get();
      return { id: updatedDoc.id, ...updatedDoc.data() } as TaskModel;

    } catch (error) {
      console.error("Error editing task by ID:", error);
      throw error;
    }
  }

  async deleteTaskById(taskId: string): Promise<void> {
    try {
      await this.collectionRef.doc(taskId).delete();
    } catch (error) {
      console.error("Error deleting task by ID:", error);
      throw error;
    }
  }

  async getTaskCountForUser(userId: string): Promise<number> {
    try {
      const querySnapshot = await this.collectionRef.where("user_id", "==", userId).get();

      return querySnapshot.size;

    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  };
}

export default new TaskService();

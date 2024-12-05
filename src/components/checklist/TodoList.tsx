import React, { useState } from "react";
import { Plus, Trash2, Check } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { Card } from "../ui/Card";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { Todo } from "../../context/AppContext"; // Assurez-vous que l'interface Todo est bien définie dans ce fichier.
import { useApp } from "../../context/AppContext";
import { formatDate } from "../../utils/dateUtils";

export const TodoList: React.FC = () => {
  const { state, dispatch } = useApp();
  const [newTodo, setNewTodo] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    const todo: Todo = {
      id: uuidv4(),
      text: newTodo,
      completed: false,
      dueDate: dueDate || undefined,
      createdAt: new Date().toISOString(),
    };

    dispatch({ type: "ADD_TODO", payload: todo });
    setNewTodo("");
    setDueDate("");
  };

  const handleToggleTodo = (id: string) => {
    const todo = state.todos?.find((t) => t.id === id);
    if (todo) {
      dispatch({
        type: "UPDATE_TODO",
        payload: { ...todo, completed: !todo.completed },
      });
    }
  };

  const handleDeleteTodo = (id: string) => {
    dispatch({ type: "DELETE_TODO", payload: id });
  };

  const sortedTodos = (state.todos || []).sort((a, b) => {
    if (a.completed === b.completed) {
      if (a.dueDate && b.dueDate) {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return a.completed ? 1 : -1;
  });

  return (
    <Card className="h-full">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Checklist</h2>

      <form onSubmit={handleAddTodo} className="mb-4">
        <div className="flex gap-2">
          <div className="flex-grow">
            <Input
              label=""
              placeholder="Ajouter une tâche..."
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
            />
          </div>
          <div className="w-40">
            <Input
              label=""
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          <Button type="submit" className="mt-1">
            <Plus size={20} />
          </Button>
        </div>
      </form>

      <div className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto">
        {sortedTodos.map((todo) => (
          <div
            key={todo.id}
            className={`flex items-center gap-2 p-2 rounded hover:bg-gray-50 ${
              todo.completed ? "opacity-50" : ""
            }`}
          >
            <button
              onClick={() => handleToggleTodo(todo.id)}
              className={`w-5 h-5 rounded border flex items-center justify-center ${
                todo.completed
                  ? "bg-green-500 border-green-500 text-white"
                  : "border-gray-300"
              }`}
            >
              {todo.completed && <Check size={14} />}
            </button>
            <span className="flex-grow">
              <span
                className={`${
                  todo.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {todo.text}
              </span>
              {todo.dueDate && (
                <span className="ml-2 text-sm text-gray-500">
                  {formatDate(todo.dueDate)}
                </span>
              )}
            </span>
            <button
              onClick={() => handleDeleteTodo(todo.id)}
              className="text-gray-400 hover:text-red-500"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
};

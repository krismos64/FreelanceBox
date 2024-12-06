import React from 'react';
import { TodoList } from '../components/checklist/TodoList';
import { PageTransition } from '../components/PageTransition';

const ChecklistPage: React.FC = () => {
  return (
    <PageTransition>
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Checklist</h1>
        <div className="max-w-3xl">
          <TodoList />
        </div>
      </div>
    </PageTransition>
  );
};

export default ChecklistPage;
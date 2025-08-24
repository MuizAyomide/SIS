import React from 'react';
import { BookOpen, User, Edit } from 'lucide-react';
import { useApp } from '../../contexts/AppContext.jsx';

const ResultCard = ({ result, course, student, onEdit }) => {
  if (!course) return null;

  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A': return 'bg-green-100 text-green-800';
      case 'B+': return 'bg-blue-100 text-blue-800';
      case 'B': return 'bg-blue-100 text-blue-800';
      case 'C+': return 'bg-yellow-100 text-yellow-800';
      case 'C': return 'bg-yellow-100 text-yellow-800';
      case 'D': return 'bg-orange-100 text-orange-800';
      case 'F': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-md bg-[#dbeafe] flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-[#2563eb]" />
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">{course.code}</h3>
              <p className="text-sm text-gray-500">{course.name}</p>
            </div>
          </div>
          {onEdit && (
            <button
              onClick={onEdit}
              className="text-[#2563eb] hover:text-[#1e3a8a]"
            >
              <Edit className="h-5 w-5" />
            </button>
          )}
        </div>
        
        {student && (
          <div className="mt-4 flex items-center">
            <User className="h-4 w-4 text-gray-400 mr-2" />
            <span className="text-sm text-gray-600">{student.name}</span>
          </div>
        )}
        
        {result && (
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Score</p>
              <p className="text-lg font-semibold text-gray-900">{result.score}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Grade</p>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getGradeColor(result.grade)}`}>
                {result.grade}
              </span>
            </div>
          </div>
        )}
        
        {!result && (
          <div className="mt-4">
            <p className="text-sm text-gray-500">No result recorded yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultCard;
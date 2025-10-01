'use client';

import React, { useState } from 'react';
import {
  ChevronRight, Check, Lock, BookOpen, Lightbulb, Globe2, Sparkles,
  ArrowRight, Award, X, Menu, ArrowLeft
} from 'lucide-react';

// Import content: your file currently exports an array (default)
// This code will work whether you later switch to { rooms, quiz } or keep array.
import FLOOR1 from '@/content/floor1/index';

export default function DataEngineeringPlatform() {
  // Normalize content shape
  const rooms = Array.isArray(FLOOR1) ? FLOOR1 : (FLOOR1?.rooms ?? []);
  const quiz = Array.isArray(FLOOR1) ? null : (FLOOR1?.quiz ?? null);

  const [currentView, setCurrentView] = useState('room');
  const [currentRoom, setCurrentRoom] = useState(0);
  const [completedRooms, setCompletedRooms] = useState([]);
  const [quizScore, setQuizScore] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [flashcardFlipped, setFlashcardFlipped] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [blockSize, setBlockSize] = useState(128);

  const currentRoomData = rooms[currentRoom];
  const quizUnlocked = !!quiz && completedRooms.length === rooms.length;
  const reviewUnlocked = !!quiz && quizScore !== null && quizScore >= (quiz?.passingScore ?? 0);

  const handleRoomComplete = () => {
    if (!completedRooms.includes(currentRoom)) {
      setCompletedRooms(prev => [...prev, currentRoom]);
    }
  };

  const handleNextRoom = () => {
    handleRoomComplete();
    if (currentRoom < rooms.length - 1) {
      setCurrentRoom(currentRoom + 1);
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (quiz) {
      setCurrentView('quiz');
    }
  };

  const handlePrevRoom = () => {
    if (currentRoom > 0) {
      setCurrentRoom(currentRoom - 1);
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleQuizSubmit = () => {
    if (!quiz) return;
    let correct = 0;
    quiz.questions.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correct) correct++;
    });
    const score = Math.round((correct / quiz.questions.length) * 100);
    setQuizScore(score);
    setQuizSubmitted(true);
  };

  const handleNavigation = (view, roomId = null) => {
    setCurrentView(view);
    if (roomId !== null) setCurrentRoom(roomId);
    setSidebarOpen(false);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderContent = (text = '') => {
    return text.split('\n\n').map((paragraph, idx) => {
      // Section header pattern: "**Title**" then newline(s) then body
      if (paragraph.startsWith('**') && paragraph.includes('**\n')) {
        const lines = paragraph.split('\n');
        const title = lines[0].replace(/\*\*/g, '');
        const content = lines.slice(1).join('\n');
        return (
          <div key={idx} className="mb-6">
            <h4 className="text-lg font-bold text-slate-900 mb-3">{title}</h4>
            <p className="text-slate-700 leading-relaxed">{content.replace(/\*\*/g, '')}</p>
          </div>
        );
      }

      // Bulleted block that starts with •
      if (paragraph.startsWith('•')) {
        const items = paragraph.split('\n').filter(line => line.trim());
        return (
          <ul key={idx} className="space-y-3 mb-6">
            {items.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-slate-700 text-lg">
                  {item.replace(/^•\s?/, '').replace(/\*\*/g, '')}
                </span>
              </li>
            ))}
          </ul>
        );
      }

      return (
        <p key={idx} className="text-slate-700 text-lg leading-relaxed mb-4">
          {paragraph.replace(/\*\*/g, '')}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/80 border-b border-slate-200/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl blur opacity-40"></div>
              <div className="relative bg-gradient-to-br from-blue-600 to-indigo-600 w-10 h-10 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">DE</span>
              </div>
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Data Engineering Mastery
              </h1>
              <p className="text-xs text-slate-500">
                Floor 1 • {currentView === 'room' ? `Room ${currentRoom + 1}` : currentView.charAt(0).toUpperCase() + currentView.slice(1)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full shadow-lg shadow-amber-500/20">
              <Award className="w-4 h-4 text-white" />
              <span className="text-xs sm:text-sm font-semibold text-white">{completedRooms.length}/{rooms.length || 0}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex gap-8">

          {/* Sidebar */}
          <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:sticky top-24 left-0 w-80 h-fit bg-white lg:bg-transparent z-40 transition-transform duration-300`}>
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200/60 overflow-hidden">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-6">
                <h2 className="text-white font-bold text-lg mb-1">Floor 1</h2>
                <p className="text-blue-100 text-sm">Big Data Foundations</p>
              </div>

              <div className="p-6 space-y-2 max-h-[600px] overflow-y-auto">
                {rooms.map((room, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleNavigation('room', idx)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all ${
                      currentView === 'room' && currentRoom === idx
                        ? 'bg-blue-500 text-white'
                        : completedRooms.includes(idx)
                        ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {completedRooms.includes(idx) && <Check className="w-4 h-4" />}
                      <span>Room {idx + 1}: {room.title}</span>
                    </div>
                  </button>
                ))}

                {/* Quiz button only if quiz exists */}
                {quiz && (
                  <button
                    onClick={() => quizUnlocked && handleNavigation('quiz')}
                    disabled={!quizUnlocked}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all ${
                      currentView === 'quiz'
                        ? 'bg-amber-500 text-white'
                        : quizUnlocked
                        ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                        : 'bg-slate-100 text-slate-400 opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {quizUnlocked ? <Sparkles className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                      <span>Floor Quiz{quizScore !== null ? ` (${quizScore}%)` : ''}</span>
                    </div>
                  </button>
                )}

                {/* Review features only if quiz exists */}
                {quiz && (
                  <>
                    <button
                      onClick={() => reviewUnlocked && handleNavigation('summary')}
                      disabled={!reviewUnlocked}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all ${
                        currentView === 'summary'
                          ? 'bg-emerald-500 text-white'
                          : reviewUnlocked
                          ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                          : 'bg-slate-100 text-slate-400 opacity-50 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {reviewUnlocked ? <BookOpen className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                        <span>Summary</span>
                      </div>
                    </button>

                    <button
                      onClick={() => reviewUnlocked && handleNavigation('glossary')}
                      disabled={!reviewUnlocked}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all ${
                        currentView === 'glossary'
                          ? 'bg-purple-500 text-white'
                          : reviewUnlocked
                          ? 'bg-purple-100 text-purple-800 hover:bg-purple-200'
                          : 'bg-slate-100 text-slate-400 opacity-50 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {reviewUnlocked ? <BookOpen className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                        <span>Glossary</span>
                      </div>
                    </button>

                    <button
                      onClick={() => reviewUnlocked && handleNavigation('flashcards')}
                      disabled={!reviewUnlocked}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all ${
                        currentView === 'flashcards'
                          ? 'bg-pink-500 text-white'
                          : reviewUnlocked
                          ? 'bg-pink-100 text-pink-800 hover:bg-pink-200'
                          : 'bg-slate-100 text-slate-400 opacity-50 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {reviewUnlocked ? <Sparkles className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                        <span>Flashcards</span>
                      </div>
                    </button>
                  </>
                )}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 max-w-3xl">
            {/* ROOM VIEW */}
            {currentView === 'room' && currentRoomData && (
              <>
                <div className="mb-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm mb-4">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-slate-700">Room {currentRoom + 1} • Currently Learning</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">{currentRoomData.title}</h1>
                  <p className="text-base sm:text-lg text-slate-600">{currentRoomData.subtitle}</p>
                </div>

                <div className="space-y-8">
                  {/* Context Section */}
                  <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200/60 p-6 sm:p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center shadow-lg shadow-rose-500/30">
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Context</h2>
                        <p className="text-sm text-slate-500">Why this matters now</p>
                      </div>
                    </div>
                    <div className="prose prose-slate max-w-none">
                      {renderContent(currentRoomData?.sections?.context?.content)}
                    </div>
                  </div>

                  {/* Core Concept Section */}
                  <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200/60 p-6 sm:p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
                        <Lightbulb className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Core Concept</h2>
                        <p className="text-sm text-slate-500">Master the fundamentals</p>
                      </div>
                    </div>
                    <div className="prose prose-slate max-w-none">
                      {renderContent(currentRoomData?.sections?.concept?.content)}
                    </div>
                    {currentRoomData?.sections?.concept?.keyInsight && (
                      <div className="mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
                        <div className="flex items-start gap-3">
                          <Lightbulb className="w-6 h-6 flex-shrink-0 mt-1" />
                          <div>
                            <p className="font-semibold text-lg mb-2">Key Insight</p>
                            <p className="text-blue-100">{currentRoomData.sections.concept.keyInsight}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Use hasInteractive flag instead of hardcoding an index */}
                    {currentRoomData?.hasInteractive && (
                      <div className="mt-8 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border-2 border-purple-200">
                        <h3 className="font-bold text-purple-900 mb-4">Block Size Visualization</h3>
                        <div className="mb-6">
                          <div className="flex items-center justify-between mb-4">
                            <label className="text-sm font-semibold text-slate-700">Block Size</label>
                            <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                              {blockSize} MB
                            </div>
                          </div>
                          <input
                            type="range"
                            min="64"
                            max="256"
                            step="64"
                            value={blockSize}
                            onChange={(e) => setBlockSize(parseInt(e.target.value))}
                            className="w-full h-3 bg-purple-200 rounded-lg appearance-none cursor-pointer"
                          />
                          <div className="flex justify-between text-xs text-slate-500 mt-2">
                            <span>64 MB</span>
                            <span>128 MB</span>
                            <span>256 MB</span>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="bg-white rounded-lg p-4 flex justify-between items-center">
                            <span className="text-slate-700 font-medium">1 GB file splits into</span>
                            <span className="text-2xl font-bold text-purple-600">{Math.ceil(1024 / blockSize)} blocks</span>
                          </div>
                          <div className="bg-white rounded-lg p-4 flex justify-between items-center">
                            <span className="text-slate-700 font-medium">Parallel tasks possible</span>
                            <span className="text-2xl font-bold text-blue-600">{Math.ceil(1024 / blockSize)} tasks</span>
                          </div>
                          <div className="bg-white rounded-lg p-4 flex justify-between items-center">
                            <span className="text-slate-700 font-medium">Metadata entries</span>
                            <span className="text-2xl font-bold text-indigo-600">{Math.ceil(1024 / blockSize)} entries</span>
                          </div>
                        </div>
                        <div className={`mt-6 p-4 rounded-lg ${
                          blockSize === 64 ? 'bg-amber-100 border-2 border-amber-300'
                          : blockSize === 256 ? 'bg-amber-100 border-2 border-amber-300'
                          : 'bg-emerald-100 border-2 border-emerald-300'
                        }`}>
                          <p className={`font-semibold text-sm ${blockSize === 128 ? 'text-emerald-700' : 'text-amber-700'}`}>
                            {blockSize === 64 && 'More parallelism but higher NameNode metadata overhead'}
                            {blockSize === 128 && 'Optimal balance - perfect for most workloads'}
                            {blockSize === 256 && 'Less parallelism but lighter NameNode burden'}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Real-World Section */}
                  <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200/60 p-6 sm:p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                        <Globe2 className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Real-World Example</h2>
                        <p className="text-sm text-slate-500">How companies use this</p>
                      </div>
                    </div>
                    <div className="prose prose-slate max-w-none">
                      {renderContent(currentRoomData?.sections?.realworld?.content)}
                    </div>
                    {currentRoomData?.sections?.realworld?.stats && (
                      <div className="grid grid-cols-3 gap-4 mt-6">
                        {currentRoomData.sections.realworld.stats.map((stat, idx) => (
                          <div key={idx} className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-4 text-center border-2 border-emerald-200">
                            <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-1">
                              {stat.value}
                            </div>
                            <div className="text-xs text-slate-600 font-medium">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Transition */}
                  {currentRoomData?.transition && (
                    <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border-l-4 border-indigo-500 rounded-r-xl p-6">
                      <p className="text-slate-700 italic leading-relaxed">{currentRoomData.transition}</p>
                    </div>
                  )}
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-8 gap-4">
                  <button
                    onClick={handlePrevRoom}
                    disabled={currentRoom === 0}
                    className="group flex items-center gap-2 px-4 sm:px-6 py-3 bg-white hover:bg-slate-50 disabled:bg-slate-100 text-slate-700 disabled:text-slate-400 font-medium rounded-xl border-2 border-slate-200 hover:border-slate-300 disabled:border-slate-200 transition-all"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Previous</span>
                  </button>

                  <button
                    onClick={handleNextRoom}
                    className="group flex items-center gap-2 px-4 sm:px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 transition-all"
                  >
                    <span>{currentRoom === rooms.length - 1 ? (quiz ? 'Take Quiz' : 'Finish') : 'Next Room'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}

            {/* QUIZ VIEW */}
            {currentView === 'quiz' && quiz && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200/60 p-8">
                  <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">{quiz.title}</h1>
                    <p className="text-slate-600">{quiz.description}</p>
                    <p className="text-sm text-slate-500 mt-2">Passing Score: {quiz.passingScore}%</p>
                  </div>

                  {!quizSubmitted ? (
                    <div className="space-y-6">
                      {quiz.questions.map((q, idx) => (
                        <div key={idx} className="bg-slate-50 rounded-xl p-6 border-2 border-slate-200">
                          <p className="font-semibold text-slate-900 mb-4">
                            {idx + 1}. {q.question}
                          </p>
                          <div className="space-y-3">
                            {q.options.map((option, optIdx) => (
                              <label
                                key={optIdx}
                                className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                                  quizAnswers[idx] === optIdx
                                    ? 'bg-blue-100 border-blue-500'
                                    : 'bg-white border-slate-200 hover:border-blue-300'
                                }`}
                              >
                                <input
                                  type="radio"
                                  name={`question-${idx}`}
                                  checked={quizAnswers[idx] === optIdx}
                                  onChange={() => setQuizAnswers({ ...quizAnswers, [idx]: optIdx })}
                                  className="w-4 h-4"
                                />
                                <span className="text-slate-700">{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}

                      <button
                        onClick={handleQuizSubmit}
                        disabled={Object.keys(quizAnswers).length !== quiz.questions.length}
                        className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:from-slate-300 disabled:to-slate-400 text-white font-bold rounded-xl shadow-lg transition-all disabled:cursor-not-allowed"
                      >
                        Submit Quiz
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className={`p-8 rounded-2xl text-center ${
                        quizScore >= quiz.passingScore
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
                          : 'bg-gradient-to-r from-rose-500 to-pink-500'
                      }`}>
                        <div className="text-white">
                          <p className="text-6xl font-bold mb-4">{quizScore}%</p>
                          <p className="text-2xl font-semibold mb-2">
                            {quizScore >= quiz.passingScore ? 'Passed!' : 'Not Quite There'}
                          </p>
                          <p className="text-lg opacity-90">
                            {quizScore >= quiz.passingScore
                              ? 'Excellent work! Review features unlocked.'
                              : `You need ${quiz.passingScore}% to pass. Review the material and try again.`}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {quiz.questions.map((q, idx) => {
                          const isCorrect = quizAnswers[idx] === q.correct;
                          return (
                            <div
                              key={idx}
                              className={`p-6 rounded-xl border-2 ${
                                isCorrect
                                  ? 'bg-emerald-50 border-emerald-300'
                                  : 'bg-rose-50 border-rose-300'
                              }`}
                            >
                              <div className="flex items-start gap-3 mb-3">
                                {isCorrect ? (
                                  <Check className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                                ) : (
                                  <X className="w-6 h-6 text-rose-600 flex-shrink-0" />
                                )}
                                <div className="flex-1">
                                  <p className="font-semibold text-slate-900 mb-2">{q.question}</p>
                                  <p className="text-sm text-slate-600 mb-2">
                                    <span className="font-medium">Your answer:</span> {q.options[quizAnswers[idx]]}
                                  </p>
                                  {!isCorrect && (
                                    <p className="text-sm text-slate-600 mb-2">
                                      <span className="font-medium">Correct answer:</span> {q.options[q.correct]}
                                    </p>
                                  )}
                                  <p className="text-sm text-slate-700 italic">{q.explanation}</p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="flex gap-4">
                        <button
                          onClick={() => {
                            setQuizSubmitted(false);
                            setQuizAnswers({});
                            setQuizScore(null);
                          }}
                          className="flex-1 py-3 bg-white hover :bg-slate-50 text-slate-700 font-semibold rounded-xl border-2 border-slate-200 transition-all"
                        >
                          Retake Quiz
                        </button>
                        {quizScore >= quiz.passingScore && (
                          <button
                            onClick={() => handleNavigation('summary')}
                            className="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold rounded-xl shadow-lg transition-all"
                          >
                            Continue to Summary
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* SUMMARY VIEW */}
            {currentView === 'summary' && (
              <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200/60 p-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-6">Floor 1 Summary</h1>
                <div className="space-y-6">
                  {rooms.map((room, idx) => (
                    <div key={idx} className="border-l-4 border-blue-500 pl-6 py-2">
                      <h3 className="font-bold text-lg text-slate-900 mb-2">{room.title}</h3>
                      <p className="text-slate-600 text-sm">{room.subtitle}</p>
                      {room.sections?.concept?.keyInsight && (
                        <p className="text-slate-500 text-xs mt-2 italic">
                          💡 {room.sections.concept.keyInsight}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* GLOSSARY VIEW */}
            {currentView === 'glossary' && (
              <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200/60 p-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-6">Key Terms Glossary</h1>
                <div className="space-y-4">
                  <div className="bg-slate-50 rounded-lg p-4 border-l-4 border-blue-500">
                    <h3 className="font-bold text-slate-900 mb-1">HDFS (Hadoop Distributed File System)</h3>
                    <p className="text-slate-600 text-sm">Storage layer for distributed data that splits large files into blocks and distributes them across multiple DataNodes for parallel processing and fault tolerance.</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4 border-l-4 border-indigo-500">
                    <h3 className="font-bold text-slate-900 mb-1">NameNode</h3>
                    <p className="text-slate-600 text-sm">Master server that manages metadata and file system namespace. Tracks which blocks belong to which files and their locations across DataNodes.</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4 border-l-4 border-purple-500">
                    <h3 className="font-bold text-slate-900 mb-1">DataNode</h3>
                    <p className="text-slate-600 text-sm">Worker nodes that store actual data blocks on disk and send heartbeats to the NameNode every 3 seconds to confirm they're alive.</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4 border-l-4 border-emerald-500">
                    <h3 className="font-bold text-slate-900 mb-1">Replication Factor</h3>
                    <p className="text-slate-600 text-sm">Number of copies of each data block stored across different DataNodes. Default is 3, allowing the system to survive 2 simultaneous node failures.</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4 border-l-4 border-amber-500">
                    <h3 className="font-bold text-slate-900 mb-1">Block Size</h3>
                    <p className="text-slate-600 text-sm">Size of data chunks that files are split into. Default is 128 MB, balancing parallelism (more tasks) with metadata overhead (NameNode tracking).</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4 border-l-4 border-rose-500">
                    <h3 className="font-bold text-slate-900 mb-1">Horizontal Scaling</h3>
                    <p className="text-slate-600 text-sm">Adding more machines to distribute workload, as opposed to vertical scaling (making one machine more powerful). Better for fault tolerance and unlimited growth.</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4 border-l-4 border-cyan-500">
                    <h3 className="font-bold text-slate-900 mb-1">High Availability (HA)</h3>
                    <p className="text-slate-600 text-sm">Architecture using Active/Standby NameNode pairs with ZooKeeper coordination to eliminate single points of failure and enable automatic failover in ~30 seconds.</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4 border-l-4 border-teal-500">
                    <h3 className="font-bold text-slate-900 mb-1">The 5 Vs of Big Data</h3>
                    <p className="text-slate-600 text-sm">Volume (scale), Velocity (speed), Variety (types), Veracity (quality), and Value (usefulness) - the five characteristics that define Big Data challenges.</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4 border-l-4 border-pink-500">
                    <h3 className="font-bold text-slate-900 mb-1">Rack Awareness</h3>
                    <p className="text-slate-600 text-sm">HDFS strategy of distributing replicas across different physical racks/datacenters to survive rack-level failures (power, network issues).</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4 border-l-4 border-orange-500">
                    <h3 className="font-bold text-slate-900 mb-1">Cloud Data Lake</h3>
                    <p className="text-slate-600 text-sm">Modern architecture using object storage (S3, ADLS) that decouples storage from compute, allowing independent scaling and ephemeral compute clusters.</p>
                  </div>
                </div>
              </div>
            )}

            {/* FLASHCARDS VIEW */}
            {currentView === 'flashcards' && quiz && (
              <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold text-slate-900 mb-6 text-center">Study Flashcards</h1>
                <p className="text-center text-slate-600 mb-8">Click card to flip</p>
                <div className="relative" style={{ height: '400px' }}>
                  <div
                    onClick={() => setFlashcardFlipped(!flashcardFlipped)}
                    className="absolute inset-0 cursor-pointer"
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: flashcardFlipped ? 'rotateY(180deg)' : 'rotateY(0)',
                      transition: 'transform 0.6s'
                    }}
                  >
                    {/* Front of card */}
                    <div
                      className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-2xl p-8 flex items-center justify-center"
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                      <div className="text-center">
                        <div className="text-sm text-blue-200 mb-4">Question {flashcardIndex + 1}</div>
                        <p className="text-white text-2xl font-bold">
                          {quiz.questions[flashcardIndex]?.question}
                        </p>
                      </div>
                    </div>
                    {/* Back of card */}
                    <div
                      className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-2xl p-8 flex items-center justify-center"
                      style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                    >
                      <div className="text-white text-center">
                        <div className="text-sm text-emerald-200 mb-4">Answer</div>
                        <p className="text-xl font-semibold mb-4">
                          {quiz.questions[flashcardIndex]?.options[quiz.questions[flashcardIndex]?.correct]}
                        </p>
                        <div className="h-px bg-white/30 my-4"></div>
                        <p className="text-sm opacity-90 leading-relaxed">
                          {quiz.questions[flashcardIndex]?.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-8">
                  <button
                    onClick={() => {
                      setFlashcardIndex(Math.max(0, flashcardIndex - 1));
                      setFlashcardFlipped(false);
                    }}
                    disabled={flashcardIndex === 0}
                    className="px-6 py-3 bg-white hover:bg-slate-50 disabled:bg-slate-100 text-slate-700 disabled:text-slate-400 font-semibold rounded-xl border-2 border-slate-200 transition-all disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <span className="text-slate-600 font-medium">
                    {flashcardIndex + 1} / {quiz.questions.length}
                  </span>
                  <button
                    onClick={() => {
                      setFlashcardIndex(Math.min(quiz.questions.length - 1, flashcardIndex + 1));
                      setFlashcardFlipped(false);
                    }}
                    disabled={flashcardIndex === quiz.questions.length - 1}
                    className="px-6 py-3 bg-white hover:bg-slate-50 disabled:bg-slate-100 text-slate-700 disabled:text-slate-400 font-semibold rounded-xl border-2 border-slate-200 transition-all disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
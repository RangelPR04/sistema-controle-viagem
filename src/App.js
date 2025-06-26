import React, { useState } from 'react';
import { Camera, CheckCircle, XCircle, Play, Square, FileText, Wrench, Users, Truck, Settings, LogOut, Eye, Plus, Edit2, Trash2, AlertTriangle } from 'lucide-react';

const SistemaControleViagem = () => {
  const [tela, setTela] = useState('login');
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-2xl p-8">
        <div className="text-center mb-8">
          <Truck className="mx-auto text-blue-600 mb-4" size={48} />
          <h1 className="text-3xl font-bold text-gray-800">Sistema de Viagens</h1>
          <p className="text-gray-600 mt-2">Controle de Frota de Ônibus</p>
        </div>
        
        <div className="space-y-4">
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Nome do usuário ou 'admin'"
          />
          
          <input
            ty

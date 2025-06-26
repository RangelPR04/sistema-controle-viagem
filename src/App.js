import React, { useState } from 'react';
import { Truck, User, MapPin, PlayCircle, CheckCircle, Camera, LogOut } from 'lucide-react';
import './index.css';

// Dados de usuários
const users = {
  admin: { password: 'admin123', role: 'admin', name: 'Administrador' },
  'João Silva': { password: '123456', role: 'driver', name: 'João Silva' },
  'Maria Santos': { password: '123456', role: 'driver', name: 'Maria Santos' },
  'Pedro Oliveira': { password: '123456', role: 'driver', name: 'Pedro Oliveira' }
};

// Dados das cidades
const cities = [
  'São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Salvador', 'Brasília',
  'Fortaleza', 'Curitiba', 'Recife', 'Porto Alegre', 'Manaus'
];

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Estados do formulário de viagem
  const [tripData, setTripData] = useState({
    motorista: '',
    origem: '',
    destino: '',
    prefixoOnibus: '',
    kmInicial: '',
    checklist: {
      pneus: 'nao_conforme',
      freios: 'nao_conforme',
      luzes: 'nao_conforme',
      portas: 'nao_conforme',
      interior: 'nao_conforme'
    }
  });

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (users[username] && users[username].password === password) {
      setCurrentUser(users[username]);
      setIsLoggedIn(true);
      setLoginError('');
      
      // Se for motorista, pré-preencher o nome
      if (users[username].role === 'driver') {
        setTripData(prev => ({ ...prev, motorista: username }));
      }
    } else {
      setLoginError('Usuário ou senha incorretos');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setUsername('');
    setPassword('');
    setTripData({
      motorista: '',
      origem: '',
      destino: '',
      prefixoOnibus: '',
      kmInicial: '',
      checklist: {
        pneus: 'nao_conforme',
        freios: 'nao_conforme',
        luzes: 'nao_conforme',
        portas: 'nao_conforme',
        interior: 'nao_conforme'
      }
    });
  };

  const handleInputChange = (field, value) => {
    setTripData(prev => ({ ...prev, [field]: value }));
  };

  const handleChecklistChange = (item, value) => {
    setTripData(prev => ({
      ...prev,
      checklist: { ...prev.checklist, [item]: value }
    }));
  };

  const handleStartTrip = () => {
    // Validar se todos os campos obrigatórios estão preenchidos
    if (!tripData.motorista || !tripData.origem || !tripData.destino || 
        !tripData.prefixoOnibus || !tripData.kmInicial) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    // Simular início da viagem
    alert('Viagem iniciada com sucesso!');
    console.log('Dados da viagem:', tripData);
  };

  const takePhoto = (item) => {
    alert(`Funcionalidade de foto para ${item} será implementada`);
  };

  // Tela de Login
  if (!isLoggedIn) {
    return (
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1 className="login-title">
              <Truck size={24} />
              Sistema de Viagens
            </h1>
            <p className="login-subtitle">Controle de Frota de Ônibus</p>
          </div>
          
          <form className="login-form" onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label">Usuário</label>
              <input
                type="text"
                className="form-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nome do usuário ou 'admin'"
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Senha</label>
              <input
                type="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha"
                required
              />
            </div>
            
            {loginError && (
              <div className="error-message">
                {loginError}
              </div>
            )}
            
            <button type="submit" className="login-button">
              <User size={20} />
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Dashboard Principal
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="dashboard-title">
          <Truck size={24} />
          Sistema de Controle de Viagem
        </h1>
        <div className="user-info">
          <span>Bem-vindo, {currentUser.name}</span>
          <button onClick={handleLogout} className="logout-button">
            <LogOut size={16} />
            Sair
          </button>
        </div>
      </header>

      <main className="dashboard-content">
        <div className="trip-form">
          <h2 className="form-title">
            <MapPin size={20} />
            Nova Viagem
          </h2>

          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Motorista</label>
              <input
                type="text"
                className="form-input"
                value={tripData.motorista}
                onChange={(e) => handleInputChange('motorista', e.target.value)}
                placeholder="Nome do motorista"
                readOnly={currentUser.role === 'driver'}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Origem</label>
              <select
                className="form-select"
                value={tripData.origem}
                onChange={(e) => handleInputChange('origem', e.target.value)}
              >
                <option value="">Digite ou selecione a origem</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Destino</label>
              <select
                className="form-select"
                value={tripData.destino}
                onChange={(e) => handleInputChange('destino', e.target.value)}
              >
                <option value="">Digite ou selecione o destino</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Prefixo do Ônibus</label>
              <select
                className="form-select"
                value={tripData.prefixoOnibus}
                onChange={(e) => handleInputChange('prefixoOnibus', e.target.value)}
              >
                <option value="">Selecione</option>
                <option value="001">001</option>
                <option value="002">002</option>
                <option value="003">003</option>
                <option value="004">004</option>
                <option value="005">005</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">KM Inicial</label>
              <input
                type="number"
                className="form-input"
                value={tripData.kmInicial}
                onChange={(e) => handleInputChange('kmInicial', e.target.value)}
                placeholder="KM"
              />
            </div>
          </div>

          <div className="checklist-section">
            <h3 className="checklist-title">
              <CheckCircle size={20} />
              Checklist de Verificação
            </h3>

            <div className="checklist-grid">
              {[
                { key: 'pneus', label: 'Pneus' },
                { key: 'freios', label: 'Freios' },
                { key: 'luzes', label: 'Luzes' },
                { key: 'portas', label: 'Portas' },
                { key: 'interior', label: 'Interior' }
              ].map(item => (
                <div key={item.key} className="checklist-item">
                  <div className="checklist-item-title">{item.label}</div>
                  <div className="checklist-options">
                    <div className="radio-group">
                      <input
                        type="radio"
                        id={`${item.key}_conforme`}
                        name={item.key}
                        value="conforme"
                        className="radio-input"
                        checked={tripData.checklist[item.key] === 'conforme'}
                        onChange={(e) => handleChecklistChange(item.key, e.target.value)}
                      />
                      <label htmlFor={`${item.key}_conforme`} className="radio-label">
                        Conforme
                      </label>
                    </div>
                    <div className="radio-group">
                      <input
                        type="radio"
                        id={`${item.key}_nao_conforme`}
                        name={item.key}
                        value="nao_conforme"
                        className="radio-input"
                        checked={tripData.checklist[item.key] === 'nao_conforme'}
                        onChange={(e) => handleChecklistChange(item.key, e.target.value)}
                      />
                      <label htmlFor={`${item.key}_nao_conforme`} className="radio-label">
                        Não Conforme
                      </label>
                    </div>
                    <button
                      type="button"
                      onClick={() => takePhoto(item.label)}
                      className="photo-button"
                      title="Tirar foto"
                    >
                      <Camera size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleStartTrip}
            className="start-trip-button"
          >
            <PlayCircle size={20} />
            Iniciar Viagem
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;

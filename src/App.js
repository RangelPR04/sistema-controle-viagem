import React, { useState } from 'react';
import { Camera, CheckCircle, XCircle, Play, Square, FileText, Wrench, Users, Truck, Settings, LogOut, Eye, Plus, Edit2, Trash2, AlertTriangle, ArrowLeft, MapPin, Clock, User } from 'lucide-react';

const App = () => {
  const [tela, setTela] = useState('login');
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [tipoUsuario, setTipoUsuario] = useState(null);
  const [viagemDetalhada, setViagemDetalhada] = useState(null);
  const [modalAtivo, setModalAtivo] = useState(null); // Para os cartões clicáveis
  
  // Estados para dados
  const [credenciaisAdmin, setCredenciaisAdmin] = useState({
    usuario: 'admin',
    senha: 'admin123'
  });
  
  // Usuários do sistema com diferentes perfis
  const [usuarios, setUsuarios] = useState([
    { id: 1, nome: 'João Silva', senha: '123456', tipo: 'motorista', status: 'ativo' },
    { id: 2, nome: 'Maria Santos', senha: '123456', tipo: 'motorista', status: 'ativo' },
    { id: 3, nome: 'Pedro Oliveira', senha: '123456', tipo: 'motorista', status: 'ativo' },
    { id: 4, nome: 'Carlos Manutenção', senha: 'manut123', tipo: 'manutencao', status: 'ativo' },
    { id: 5, nome: 'Ana Gerente', senha: 'gerente123', tipo: 'gerencia', status: 'ativo' }
  ]);
  
  const [veiculos, setVeiculos] = useState([
    { 
      id: 1, 
      prefixo: '1001', 
      placa: 'ABC-1234', 
      modelo: 'Mercedes-Benz O-500', 
      status: 'manutencao',
      kmAtual: 50450,
      proximaRevisao: 55000,
      tipoRevisao: 'Revisão 10.000km',
      historicoKm: [
        { data: '2025-01-15', km: 50450, motorista: 'João Silva', tipo: 'viagem' },
        { data: '2025-01-10', km: 50000, motorista: 'Maria Santos', tipo: 'viagem' }
      ]
    },
    { 
      id: 2, 
      prefixo: '1002', 
      placa: 'DEF-5678', 
      modelo: 'Volvo B270F', 
      status: 'ativo',
      kmAtual: 42300,
      proximaRevisao: 45000,
      tipoRevisao: 'Revisão 5.000km',
      historicoKm: [
        { data: '2025-01-14', km: 42300, motorista: 'Pedro Oliveira', tipo: 'viagem' }
      ]
    },
    { 
      id: 3, 
      prefixo: '1003', 
      placa: 'GHI-9012', 
      modelo: 'Scania K270', 
      status: 'manutencao',
      kmAtual: 75680,
      proximaRevisao: 80000,
      tipoRevisao: 'Revisão 20.000km',
      historicoKm: [
        { data: '2025-01-14', km: 75680, motorista: 'Maria Santos', tipo: 'viagem' }
      ]
    }
  ]);
  
  const [cidades, setCidades] = useState([
    { id: 1, nome: 'São Paulo', uf: 'SP' },
    { id: 2, nome: 'Rio de Janeiro', uf: 'RJ' },
    { id: 3, nome: 'Belo Horizonte', uf: 'MG' },
    { id: 4, nome: 'Salvador', uf: 'BA' },
    { id: 5, nome: 'Brasília', uf: 'DF' },
    { id: 6, nome: 'Fortaleza', uf: 'CE' },
    { id: 7, nome: 'Curitiba', uf: 'PR' },
    { id: 8, nome: 'Recife', uf: 'PE' },
    { id: 9, nome: 'Porto Alegre', uf: 'RS' },
    { id: 10, nome: 'Manaus', uf: 'AM' }
  ]);
  
  const [itensChecklist, setItensChecklist] = useState([
    { id: 1, nome: 'Pneus', obrigatorio: true },
    { id: 2, nome: 'Freios', obrigatorio: true },
    { id: 3, nome: 'Luzes', obrigatorio: true },
    { id: 4, nome: 'Portas', obrigatorio: true },
    { id: 5, nome: 'Interior', obrigatorio: true }
  ]);
  
  const [viagens, setViagens] = useState([
    {
      id: 1,
      motorista: 'João Silva',
      origem: 'São Paulo - SP',
      destino: 'Rio de Janeiro - RJ',
      prefixo: '1001',
      kmInicial: '50000',
      kmFinal: '50450',
      kmPercorridos: 450,
      diversidades: 'Trânsito intenso na Dutra',
      ordemServico: 'Verificar freios - relatado pelo motorista\n\nCHECKLIST - Itens não conformes: Freios (Ruído nos freios traseiros); Luzes (Farol baixo direito queimado)',
      dataHora: '2025-01-15 08:30',
      temProblemas: true,
      precisaManutencao: true,
      statusManutencao: 'pendente',
      checklist: [
        { item: 'Pneus', status: 'conforme', foto: true, observacao: '', obrigatorio: true },
        { item: 'Freios', status: 'nao-conforme', foto: true, observacao: 'Ruído nos freios traseiros', obrigatorio: true },
        { item: 'Luzes', status: 'nao-conforme', foto: false, observacao: 'Farol baixo direito queimado', obrigatorio: true },
        { item: 'Portas', status: 'conforme', foto: false, observacao: '', obrigatorio: true },
        { item: 'Interior', status: 'conforme', foto: false, observacao: '', obrigatorio: true }
      ]
    },
    {
      id: 2,
      motorista: 'Maria Santos',
      origem: 'Belo Horizonte - MG',
      destino: 'Salvador - BA',
      prefixo: '1003',
      kmInicial: '75000',
      kmFinal: '75680',
      kmPercorridos: 680,
      diversidades: '',
      ordemServico: 'CHECKLIST - Itens não conformes: Interior (Ar condicionado não está funcionando adequadamente)',
      dataHora: '2025-01-14 14:20',
      temProblemas: true,
      precisaManutencao: true,
      statusManutencao: 'pendente',
      checklist: [
        { item: 'Pneus', status: 'conforme', foto: false, observacao: '', obrigatorio: true },
        { item: 'Freios', status: 'conforme', foto: false, observacao: '', obrigatorio: true },
        { item: 'Luzes', status: 'conforme', foto: false, observacao: '', obrigatorio: true },
        { item: 'Portas', status: 'conforme', foto: false, observacao: '', obrigatorio: true },
        { item: 'Interior', status: 'nao-conforme', foto: true, observacao: 'Ar condicionado não está funcionando adequadamente', obrigatorio: true }
      ]
    }
  ]);
  
  // Estados do formulário de login
  const [loginData, setLoginData] = useState({ usuario: '', senha: '' });
  
  // Estados para formulários
  const [novoUsuario, setNovoUsuario] = useState({ nome: '', senha: '', tipo: 'motorista' });
  const [novoVeiculo, setNovoVeiculo] = useState({ 
    prefixo: '', 
    placa: '', 
    modelo: '', 
    kmAtual: '', 
    proximaRevisao: '', 
    tipoRevisao: 'Revisão 5.000km' 
  });
  const [novaCidade, setNovaCidade] = useState({ nome: '', uf: '' });
  
  // Estados para revisões programadas
  const [revisoesAgendadas, setRevisoesAgendadas] = useState([
    {
      id: 1,
      prefixo: '1001',
      tipoRevisao: 'Revisão 10.000km',
      kmProgramado: 55000,
      kmAtual: 50450,
      status: 'agendada',
      dataAgendamento: '2025-01-15'
    },
    {
      id: 2,
      prefixo: '1003',
      tipoRevisao: 'Revisão 20.000km', 
      kmProgramado: 80000,
      kmAtual: 75680,
      status: 'agendada',
      dataAgendamento: '2025-01-14'
    }
  ]);
  
  // Estados para autocomplete
  const [sugestoesOrigem, setSugestoesOrigem] = useState([]);
  const [sugestoesDestino, setSugestoesDestino] = useState([]);
  const [mostrarSugestoesOrigem, setMostrarSugestoesOrigem] = useState(false);
  const [mostrarSugestoesDestino, setMostrarSugestoesDestino] = useState(false);
  
  // Estados da viagem
  const [etapa, setEtapa] = useState('inicial');
  const [dadosViagem, setDadosViagem] = useState({
    motorista: '',
    origem: '',
    destino: '',
    prefixo: '',
    kmInicial: '',
    kmFinal: '',
    diversidades: '',
    ordemServico: ''
  });
  
  const [checklist, setChecklist] = useState([
    { item: 'Pneus', status: 'pendente', foto: false, observacao: '', obrigatorio: true },
    { item: 'Freios', status: 'pendente', foto: false, observacao: '', obrigatorio: true },
    { item: 'Luzes', status: 'pendente', foto: false, observacao: '', obrigatorio: true },
    { item: 'Portas', status: 'pendente', foto: false, observacao: '', obrigatorio: true },
    { item: 'Interior', status: 'pendente', foto: false, observacao: '', obrigatorio: true }
  ]);

  // Função de login melhorada
  const fazerLogin = () => {
    // Login como admin
    if (loginData.usuario === credenciaisAdmin.usuario && loginData.senha === credenciaisAdmin.senha) {
      setUsuarioLogado('Administrador');
      setTipoUsuario('admin');
      setTela('dashboard-admin');
      return;
    }
    
    // Login como usuário do sistema
    const usuario = usuarios.find(u => 
      u.nome.toLowerCase() === loginData.usuario.toLowerCase() && 
      u.senha === loginData.senha &&
      u.status === 'ativo'
    );
    
    if (usuario) {
      setUsuarioLogado(usuario.nome);
      setTipoUsuario(usuario.tipo);
      
      switch (usuario.tipo) {
        case 'motorista':
          setTela('controle-viagem');
          setDadosViagem(prev => ({ ...prev, motorista: usuario.nome }));
          const checklistInicial = itensChecklist.map(item => ({
            item: item.nome,
            status: 'pendente',
            foto: false,
            observacao: '',
            obrigatorio: item.obrigatorio
          }));
          setChecklist(checklistInicial);
          break;
        case 'manutencao':
          setTela('dashboard-manutencao');
          break;
        case 'gerencia':
          setTela('dashboard-gerencia');
          break;
        default:
          setTela('dashboard-admin');
      }
    } else {
      alert('Usuário ou senha incorretos!');
    }
  };

  const logout = () => {
    setUsuarioLogado(null);
    setTipoUsuario(null);
    setTela('login');
    setLoginData({ usuario: '', senha: '' });
    setEtapa('inicial');
    setViagemDetalhada(null);
    setModalAtivo(null);
    setDadosViagem({
      motorista: '',
      origem: '',
      destino: '',
      prefixo: '',
      kmInicial: '',
      kmFinal: '',
      diversidades: '',
      ordemServico: ''
    });
  };

  // Funções CRUD
  const adicionarUsuario = () => {
    if (novoUsuario.nome && novoUsuario.senha) {
      const novoId = Math.max(...usuarios.map(u => u.id), 0) + 1;
      setUsuarios([...usuarios, { 
        id: novoId, 
        ...novoUsuario, 
        status: 'ativo' 
      }]);
      setNovoUsuario({ nome: '', senha: '', tipo: 'motorista' });
    }
  };

  const adicionarVeiculo = () => {
    if (novoVeiculo.prefixo && novoVeiculo.placa && novoVeiculo.modelo && novoVeiculo.kmAtual) {
      const novoId = Math.max(...veiculos.map(v => v.id), 0) + 1;
      const kmAtual = parseInt(novoVeiculo.kmAtual);
      const proximaRevisao = novoVeiculo.proximaRevisao ? parseInt(novoVeiculo.proximaRevisao) : kmAtual + 5000;
      
      // Validar se já existe veículo com mesmo prefixo ou placa
      if (veiculos.some(v => v.prefixo === novoVeiculo.prefixo)) {
        alert('❌ Erro: Já existe um veículo com este prefixo!');
        return;
      }
      
      if (veiculos.some(v => v.placa === novoVeiculo.placa)) {
        alert('❌ Erro: Já existe um veículo com esta placa!');
        return;
      }
      
      if (kmAtual < 0) {
        alert('❌ Erro: KM atual deve ser um número positivo!');
        return;
      }
      
      if (proximaRevisao <= kmAtual) {
        alert('❌ Erro: KM da próxima revisão deve ser maior que o KM atual!');
        return;
      }
      
      setVeiculos([...veiculos, { 
        id: novoId, 
        ...novoVeiculo,
        kmAtual: kmAtual,
        proximaRevisao: proximaRevisao,
        status: 'ativo',
        historicoKm: [
          { data: new Date().toISOString().split('T')[0], km: kmAtual, motorista: 'Cadastro inicial', tipo: 'cadastro' }
        ]
      }]);
      
      // Criar revisão agendada se necessário
      if (proximaRevisao > kmAtual) {
        const novaRevisaoId = Math.max(...revisoesAgendadas.map(r => r.id), 0) + 1;
        setRevisoesAgendadas([...revisoesAgendadas, {
          id: novaRevisaoId,
          prefixo: novoVeiculo.prefixo,
          tipoRevisao: novoVeiculo.tipoRevisao,
          kmProgramado: proximaRevisao,
          kmAtual: kmAtual,
          status: 'agendada',
          dataAgendamento: new Date().toISOString().split('T')[0]
        }]);
      }
      
      setNovoVeiculo({ prefixo: '', placa: '', modelo: '', kmAtual: '', proximaRevisao: '', tipoRevisao: 'Revisão 5.000km' });
      alert(`✅ Veículo ${novoVeiculo.prefixo} cadastrado com sucesso!\n\n📊 Informações:\n• KM Atual: ${kmAtual.toLocaleString()}\n• Próxima Revisão: ${proximaRevisao.toLocaleString()} km\n• Tipo: ${novoVeiculo.tipoRevisao}`);
    } else {
      alert('❌ Por favor, preencha todos os campos obrigatórios:\n• Prefixo\n• Placa\n• Modelo\n• KM Atual');
    }
  };

  const adicionarCidade = () => {
    if (novaCidade.nome && novaCidade.uf) {
      const novoId = Math.max(...cidades.map(c => c.id), 0) + 1;
      setCidades([...cidades, { 
        id: novoId, 
        ...novaCidade 
      }]);
      setNovaCidade({ nome: '', uf: '' });
    }
  };

  const removerUsuario = (id) => {
    setUsuarios(usuarios.filter(u => u.id !== id));
  };

  const removerVeiculo = (id) => {
    const veiculo = veiculos.find(v => v.id === id);
    if (veiculo) {
      setVeiculos(veiculos.filter(v => v.id !== id));
      setRevisoesAgendadas(revisoesAgendadas.filter(r => r.prefixo !== veiculo.prefixo));
    }
  };

  const liberarVeiculo = (id) => {
    setVeiculos(veiculos.map(v => 
      v.id === id ? { ...v, status: 'ativo' } : v
    ));
    
    // Marcar todas as viagens deste veículo como resolvidas
    const veiculo = veiculos.find(v => v.id === id);
    if (veiculo) {
      setViagens(viagens.map(v => 
        v.prefixo === veiculo.prefixo && v.statusManutencao !== 'resolvida' 
          ? { ...v, statusManutencao: 'resolvida' } 
          : v
      ));
      
      // Feedback visual
      alert(`✅ Veículo ${veiculo.prefixo} foi liberado e está disponível para uso!\n\n🔧 Todas as ordens de serviço foram automaticamente marcadas como resolvidas.`);
    }
  };

  const colocarEmManutencao = (prefixo) => {
    setVeiculos(veiculos.map(v => 
      v.prefixo === prefixo ? { ...v, status: 'manutencao' } : v
    ));
    
    // Marcar as viagens deste veículo como "em tratamento"
    setViagens(viagens.map(v => 
      v.prefixo === prefixo && (v.ordemServico || v.checklist?.some(c => c.status === 'nao-conforme'))
        ? { ...v, statusManutencao: 'em_tratamento' }
        : v
    ));
    
    alert(`🔧 Veículo ${prefixo} foi colocado em manutenção.`);
  };

  const processarOS = (viagemId) => {
    const viagem = viagens.find(v => v.id === viagemId);
    if (viagem) {
      setViagens(viagens.map(v => 
        v.id === viagemId ? { ...v, statusManutencao: 'resolvida' } : v
      ));
      alert(`✅ Ordem de serviço do veículo ${viagem.prefixo} foi processada!`);
    }
  };

  const processarRevisao = (revisaoId) => {
    setRevisoesAgendadas(revisoesAgendadas.map(r => 
      r.id === revisaoId ? { ...r, status: 'concluida' } : r
    ));
    
    const revisao = revisoesAgendadas.find(r => r.id === revisaoId);
    if (revisao) {
      // Atualizar próxima revisão do veículo
      setVeiculos(veiculos.map(v => 
        v.prefixo === revisao.prefixo ? { 
          ...v, 
          proximaRevisao: revisao.kmProgramado + 5000,
          status: 'ativo' 
        } : v
      ));
      alert(`✅ Revisão do veículo ${revisao.prefixo} foi concluída!`);
    }
  };

  const atualizarKmVeiculo = (prefixo, novoKm, motorista) => {
    const kmNum = parseInt(novoKm);
    setVeiculos(veiculos.map(v => {
      if (v.prefixo === prefixo) {
        const novoHistorico = [...v.historicoKm, {
          data: new Date().toISOString().split('T')[0],
          km: kmNum,
          motorista: motorista,
          tipo: 'viagem'
        }];
        
        // Verificar se precisa de revisão
        if (kmNum >= v.proximaRevisao) {
          // Criar nova revisão agendada
          const novaRevisaoId = Math.max(...revisoesAgendadas.map(r => r.id), 0) + 1;
          setRevisoesAgendadas(prev => [...prev, {
            id: novaRevisaoId,
            prefixo: prefixo,
            tipoRevisao: v.tipoRevisao,
            kmProgramado: v.proximaRevisao,
            kmAtual: kmNum,
            status: 'urgente',
            dataAgendamento: new Date().toISOString().split('T')[0]
          }]);
        }
        
        return {
          ...v,
          kmAtual: kmNum,
          historicoKm: novoHistorico
        };
      }
      return v;
    }));
  };

  // Função para exportar veículos para Excel
  const exportarVeiculosExcel = () => {
    const dados = veiculos.map(veiculo => {
      const ultimaViagem = veiculo.historicoKm?.slice(-1)[0];
      const proximaRevisao = revisoesAgendadas.find(r => r.prefixo === veiculo.prefixo && r.status !== 'concluida');
      const diferecaRevisao = veiculo.proximaRevisao ? veiculo.proximaRevisao - veiculo.kmAtual : 0;
      
      return {
        'Prefixo': veiculo.prefixo,
        'Placa': veiculo.placa,
        'Modelo': veiculo.modelo,
        'Status': veiculo.status === 'ativo' ? 'ATIVO' : 'MANUTENÇÃO',
        'KM Atual': veiculo.kmAtual?.toLocaleString() || 'N/A',
        'Próxima Revisão (KM)': veiculo.proximaRevisao?.toLocaleString() || 'N/A',
        'KM até Revisão': diferecaRevisao > 0 ? diferecaRevisao.toLocaleString() : (diferecaRevisao < 0 ? 'VENCIDA' : 'N/A'),
        'Tipo de Revisão': veiculo.tipoRevisao || 'N/A',
        'Última Atualização': ultimaViagem?.data || 'N/A',
        'Último Motorista': ultimaViagem?.motorista || 'N/A',
        'Status da Revisão': proximaRevisao ? (proximaRevisao.status === 'urgente' ? 'URGENTE' : 'AGENDADA') : 'OK',
        'Observações': veiculo.status === 'manutencao' ? 'Em manutenção - verificar OS pendentes' : (diferecaRevisao <= 0 && diferecaRevisao !== 0 ? 'Revisão vencida' : (diferecaRevisao <= 1000 ? 'Próximo da revisão' : 'Normal'))
      };
    });
    
    // Adicionar dados de revisões programadas
    const dadosRevisoes = revisoesAgendadas.filter(r => r.status !== 'concluida').map(revisao => {
      const veiculo = veiculos.find(v => v.prefixo === revisao.prefixo);
      return {
        'Prefixo': revisao.prefixo,
        'Placa': veiculo?.placa || 'N/A',
        'Modelo': veiculo?.modelo || 'N/A',
        'Status': 'REVISÃO PROGRAMADA',
        'KM Atual': veiculo?.kmAtual?.toLocaleString() || 'N/A',
        'Próxima Revisão (KM)': revisao.kmProgramado.toLocaleString(),
        'KM até Revisão': veiculo ? (revisao.kmProgramado - veiculo.kmAtual).toLocaleString() : 'N/A',
        'Tipo de Revisão': revisao.tipoRevisao,
        'Última Atualização': revisao.dataAgendamento,
        'Último Motorista': 'SISTEMA',
        'Status da Revisão': revisao.status.toUpperCase(),
        'Observações': veiculo && veiculo.kmAtual >= revisao.kmProgramado ? 'REVISÃO VENCIDA - AÇÃO NECESSÁRIA' : 'Revisão agendada'
      };
    });
    
    const todosOsDados = [...dados, ...dadosRevisoes];
    
    // Criar cabeçalho
    const cabecalho = Object.keys(todosOsDados[0] || {});
    
    // Converter para CSV
    const csvContent = [
      `"Sistema de Controle de Frota - Relatório Completo de Veículos"`,
      `"Data de Geração: ${new Date().toLocaleString('pt-BR')}"`,
      `"Total de Veículos: ${veiculos.length}"`,
      `"Veículos Ativos: ${veiculos.filter(v => v.status === 'ativo').length}"`,
      `"Veículos em Manutenção: ${veiculos.filter(v => v.status === 'manutencao').length}"`,
      `"Revisões Pendentes: ${revisoesAgendadas.filter(r => r.status !== 'concluida').length}"`,
      `""`, // Linha em branco
      cabecalho.map(h => `"${h}"`).join(','),
      ...todosOsDados.map(row => 
        cabecalho.map(header => `"${row[header] || ''}"`).join(',')
      )
    ].join('\n');
    
    // Simular download
    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' }); // \ufeff é BOM para UTF-8
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `relatorio_veiculos_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    
    alert(`📊 Relatório completo exportado com sucesso!\n\n📋 Incluído:\n• ${veiculos.length} veículos\n• ${revisoesAgendadas.filter(r => r.status !== 'concluida').length} revisões programadas\n• Histórico de KM\n• Status de manutenção\n\n💾 Arquivo: relatorio_veiculos_${new Date().toISOString().split('T')[0]}.csv`);
  };

  // Funções de autocomplete
  const buscarCidades = (termo, tipo) => {
    if (termo.length < 2) {
      if (tipo === 'origem') {
        setSugestoesOrigem([]);
        setMostrarSugestoesOrigem(false);
      } else {
        setSugestoesDestino([]);
        setMostrarSugestoesDestino(false);
      }
      return;
    }

    const cidadesFiltradas = cidades.filter(cidade => 
      cidade.nome.toLowerCase().includes(termo.toLowerCase()) ||
      cidade.uf.toLowerCase().includes(termo.toLowerCase())
    );

    if (tipo === 'origem') {
      setSugestoesOrigem(cidadesFiltradas);
      setMostrarSugestoesOrigem(true);
    } else {
      setSugestoesDestino(cidadesFiltradas);
      setMostrarSugestoesDestino(true);
    }
  };

  const selecionarCidade = (cidade, tipo) => {
    const nomeCompleto = `${cidade.nome} - ${cidade.uf}`;
    handleInputChange(tipo, nomeCompleto);
    
    if (tipo === 'origem') {
      setMostrarSugestoesOrigem(false);
    } else {
      setMostrarSugestoesDestino(false);
    }
  };

  // Funções da viagem
  const handleInputChange = (field, value) => {
    setDadosViagem(prev => ({ ...prev, [field]: value }));
  };

  const handleChecklistChange = (index, field, value) => {
    setChecklist(prev => prev.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    ));
  };

  const iniciarViagem = () => {
    setEtapa('viagem');
  };

  const finalizarViagem = () => {
    setEtapa('finalizacao');
  };

  const concluirViagem = () => {
    const kmInicial = parseFloat(dadosViagem.kmInicial);
    const kmFinal = parseFloat(dadosViagem.kmFinal);
    
    if (!dadosViagem.kmFinal || kmFinal <= kmInicial) {
      alert('ERRO: O KM final deve ser maior que o KM inicial!');
      return;
    }
    
    // Gerar OS automática para itens não conformes
    const itensNaoConformes = checklist.filter(item => item.status === 'nao-conforme');
    let osAutomatica = '';
    
    if (itensNaoConformes.length > 0) {
      osAutomatica = `CHECKLIST - Itens não conformes: ${itensNaoConformes.map(item => 
        `${item.item}${item.observacao ? ` (${item.observacao})` : ''}`
      ).join('; ')}`;
    }
    
    // Combinar OS manual com OS automática
    let ordemServicoCompleta = '';
    if (dadosViagem.ordemServico.trim() && osAutomatica) {
      ordemServicoCompleta = `${dadosViagem.ordemServico.trim()}\n\n${osAutomatica}`;
    } else if (dadosViagem.ordemServico.trim()) {
      ordemServicoCompleta = dadosViagem.ordemServico.trim();
    } else if (osAutomatica) {
      ordemServicoCompleta = osAutomatica;
    }
    
    const novaViagem = {
      id: viagens.length + 1,
      ...dadosViagem,
      ordemServico: ordemServicoCompleta,
      checklist: [...checklist],
      dataHora: new Date().toLocaleString(),
      kmPercorridos: kmFinal - kmInicial,
      temProblemas: checklist.some(item => item.status === 'nao-conforme') || 
                   dadosViagem.diversidades.trim() !== '' || 
                   ordemServicoCompleta.trim() !== '',
      precisaManutencao: itensNaoConformes.length > 0 || dadosViagem.ordemServico.trim() !== ''
    };
    
    setViagens([...viagens, novaViagem]);
    
    // Atualizar KM do veículo
    atualizarKmVeiculo(dadosViagem.prefixo, kmFinal, dadosViagem.motorista);
    
    // Se há problemas que necessitam manutenção, colocar veículo em manutenção automaticamente
    if (novaViagem.precisaManutencao) {
      setVeiculos(veiculos.map(v => 
        v.prefixo === dadosViagem.prefixo ? { ...v, status: 'manutencao' } : v
      ));
    }
    
    setEtapa('concluida');
  };

  const novaViagem = () => {
    setEtapa('inicial');
    setDadosViagem({
      motorista: usuarioLogado,
      origem: '',
      destino: '',
      prefixo: '',
      kmInicial: '',
      kmFinal: '',
      diversidades: '',
      ordemServico: ''
    });
    const checklistInicial = itensChecklist.map(item => ({
      item: item.nome,
      status: 'pendente',
      foto: false,
      observacao: '',
      obrigatorio: item.obrigatorio
    }));
    setChecklist(checklistInicial);
    setSugestoesOrigem([]);
    setSugestoesDestino([]);
    setMostrarSugestoesOrigem(false);
    setMostrarSugestoesDestino(false);
  };

  const podeIniciarViagem = () => {
    return dadosViagem.motorista && 
           dadosViagem.origem && 
           dadosViagem.destino && 
           dadosViagem.prefixo && 
           dadosViagem.kmInicial &&
           checklist.every(item => item.obrigatorio ? item.status !== 'pendente' : true);
  };

  const verDetalhesViagem = (viagem) => {
    setViagemDetalhada(viagem);
    setTela('detalhes-viagem');
  };

  // Componente de Modal para os cartões
  const Modal = ({ titulo, children, onFechar }) => (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px'
      }}
    >
      <div 
        style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          maxWidth: '600px',
          width: '100%',
          maxHeight: '85vh',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        <div style={{
          padding: '20px',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'white'
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0, color: '#1f2937' }}>{titulo}</h2>
          <button
            onClick={onFechar}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '28px',
              cursor: 'pointer',
              color: '#9ca3af',
              padding: '0',
              lineHeight: 1,
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ×
          </button>
        </div>
        <div style={{ 
          padding: '20px', 
          overflowY: 'auto',
          maxHeight: 'calc(85vh - 80px)',
          backgroundColor: 'white'
        }}>
          {children}
        </div>
      </div>
    </div>
  );

  // Função para handle do Enter no login
  const handleLoginKeyPress = (e) => {
    if (e.key === 'Enter') {
      fazerLogin();
    }
  };

  // TELA DE LOGIN
  if (tela === 'login') {
    return (
      <div style={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflowY: 'auto' // Adiciona rolagem
      }}>
        <div style={{
          maxWidth: '400px',
          width: '100%',
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '40px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
          margin: '20px 0' // Espaço para rolagem
        }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <Truck style={{ 
              width: '60px', 
              height: '60px', 
              color: '#4f46e5',
              margin: '0 auto 15px auto'
            }} />
            <h1 style={{ 
              fontSize: '32px', 
              fontWeight: 'bold', 
              color: '#1f2937',
              margin: 0
            }}>
              Sistema de Viagens
            </h1>
            <p style={{ 
              color: '#6b7280', 
              marginTop: '8px',
              fontSize: '16px'
            }}>
              Controle de Frota de Ônibus
            </p>
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              fontSize: '14px', 
              fontWeight: '500', 
              color: '#374151',
              marginBottom: '8px'
            }}>
              Usuário
            </label>
            <input
              type="text"
              value={loginData.usuario}
              onChange={(e) => setLoginData({...loginData, usuario: e.target.value})}
              onKeyPress={handleLoginKeyPress}
              placeholder="Nome do usuário"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            />
          </div>
          
          <div style={{ marginBottom: '25px' }}>
            <label style={{ 
              display: 'block', 
              fontSize: '14px', 
              fontWeight: '500', 
              color: '#374151',
              marginBottom: '8px'
            }}>
              Senha
            </label>
            <input
              type="password"
              value={loginData.senha}
              onChange={(e) => setLoginData({...loginData, senha: e.target.value})}
              onKeyPress={handleLoginKeyPress}
              placeholder="Senha"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            />
          </div>
          
          <button
            onClick={fazerLogin}
            style={{
              width: '100%',
              backgroundColor: '#4f46e5',
              color: 'white',
              padding: '12px',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              marginBottom: '20px'
            }}
          >
            Entrar
          </button>
          
          <div style={{ 
            fontSize: '12px', 
            color: '#6b7280', 
            textAlign: 'center',
            lineHeight: '1.4'
          }}>
            <p style={{ margin: '3px 0' }}><strong>Admin:</strong> admin / admin123</p>
            <p style={{ margin: '3px 0' }}><strong>Motorista:</strong> João Silva / 123456</p>
            <p style={{ margin: '3px 0' }}><strong>Manutenção:</strong> Carlos Manutenção / manut123</p>
            <p style={{ margin: '3px 0' }}><strong>Gerência:</strong> Ana Gerente / gerente123</p>
          </div>
        </div>
      </div>
    );
  }

  // DASHBOARD ADMIN
  if (tela === 'dashboard-admin') {
    const motoristas = usuarios.filter(u => u.tipo === 'motorista');
    const viagensComProblemas = viagens.filter(v => v.temProblemas).length;
    const veiculosManutencao = veiculos.filter(v => v.status === 'manutencao').length;
    const revisoesUrgentes = revisoesAgendadas.filter(r => {
      const veiculo = veiculos.find(v => v.prefixo === r.prefixo);
      return veiculo && veiculo.kmAtual >= r.kmProgramado && r.status !== 'concluida';
    });
    
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
        <header style={{ 
          backgroundColor: 'white', 
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          padding: '16px 0'
        }}>
          <div style={{ 
            maxWidth: '1200px', 
            margin: '0 auto', 
            padding: '0 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>
              Painel Administrativo
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              {revisoesUrgentes.length > 0 && (
                <div style={{
                  backgroundColor: '#dc2626',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '16px',
                  fontSize: '12px',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <AlertTriangle size={14} />
                  {revisoesUrgentes.length} Revisão(ões) Urgente(s)
                </div>
              )}
              <span style={{ color: '#6b7280' }}>Olá, {usuarioLogado}</span>
              <button
                onClick={logout}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  color: '#dc2626',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                <LogOut size={20} />
                <span>Sair</span>
              </button>
            </div>
          </div>
        </header>

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
          {/* Alerta de revisões urgentes */}
          {revisoesUrgentes.length > 0 && (
            <div style={{
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '24px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <AlertTriangle style={{ color: '#dc2626', marginRight: '8px' }} size={20} />
                <strong style={{ color: '#991b1b' }}>Atenção: Revisões Urgentes</strong>
              </div>
              <p style={{ color: '#991b1b', fontSize: '14px', margin: '0 0 8px 0' }}>
                Os seguintes veículos ultrapassaram a quilometragem de revisão:
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {revisoesUrgentes.map(revisao => (
                  <span key={revisao.id} style={{
                    backgroundColor: '#dc2626',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '500'
                  }}>
                    {revisao.prefixo} ({revisao.tipoRevisao})
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Cards de estatísticas - Agora clicáveis */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '24px',
            marginBottom: '32px'
          }}>
            <div 
              onClick={() => setModalAtivo('usuarios')}
              style={{ 
                backgroundColor: 'white', 
                padding: '24px', 
                borderRadius: '8px', 
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Users style={{ color: '#2563eb', marginRight: '12px' }} size={32} />
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>Usuários</h3>
                  <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#2563eb', margin: '4px 0 0 0' }}>
                    {usuarios.length}
                  </p>
                </div>
              </div>
            </div>
            
            <div 
              onClick={() => setModalAtivo('veiculos')}
              style={{ 
                backgroundColor: 'white', 
                padding: '24px', 
                borderRadius: '8px', 
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Truck style={{ color: '#059669', marginRight: '12px' }} size={32} />
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>Veículos</h3>
                  <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#059669', margin: '4px 0 0 0' }}>
                    {veiculos.length}
                  </p>
                  {veiculosManutencao > 0 && (
                    <p style={{ fontSize: '11px', color: '#dc2626', margin: '2px 0 0 0' }}>
                      {veiculosManutencao} em manutenção
                    </p>
                  )}
                </div>
              </div>
            </div>
            
            <div 
              onClick={() => setModalAtivo('cidades')}
              style={{ 
                backgroundColor: 'white', 
                padding: '24px', 
                borderRadius: '8px', 
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <MapPin style={{ color: '#7c3aed', marginRight: '12px' }} size={32} />
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>Cidades</h3>
                  <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#7c3aed', margin: '4px 0 0 0' }}>
                    {cidades.length}
                  </p>
                </div>
              </div>
            </div>

            <div 
              onClick={() => setModalAtivo('viagens')}
              style={{ 
                backgroundColor: 'white', 
                padding: '24px', 
                borderRadius: '8px', 
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FileText style={{ color: '#ea580c', marginRight: '12px' }} size={32} />
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>Viagens</h3>
                  <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#ea580c', margin: '4px 0 0 0' }}>
                    {viagens.length}
                  </p>
                </div>
              </div>
            </div>

            <div 
              onClick={() => setModalAtivo('ocorrencias')}
              style={{ 
                backgroundColor: 'white', 
                padding: '24px', 
                borderRadius: '8px', 
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <AlertTriangle style={{ color: '#dc2626', marginRight: '12px' }} size={32} />
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>Ocorrências</h3>
                  <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#dc2626', margin: '4px 0 0 0' }}>
                    {viagensComProblemas}
                  </p>
                </div>
              </div>
            </div>

            <div 
              onClick={() => setModalAtivo('revisoes')}
              style={{ 
                backgroundColor: 'white', 
                padding: '24px', 
                borderRadius: '8px', 
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Settings style={{ color: '#059669', marginRight: '12px' }} size={32} />
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>Revisões</h3>
                  <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#059669', margin: '4px 0 0 0' }}>
                    {revisoesAgendadas.filter(r => r.status !== 'concluida').length}
                  </p>
                  {revisoesUrgentes.length > 0 && (
                    <p style={{ fontSize: '11px', color: '#dc2626', margin: '2px 0 0 0' }}>
                      {revisoesUrgentes.length} urgente(s)
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modais dos cartões */}
        {modalAtivo === 'usuarios' && (
          <Modal titulo="Gerenciar Usuários" onFechar={() => setModalAtivo(null)}>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ marginBottom: '12px' }}>
                <input
                  id="input-usuario-nome"
                  type="text"
                  placeholder="Nome do usuário"
                  value={novoUsuario.nome}
                  onChange={(e) => setNovoUsuario({...novoUsuario, nome: e.target.value})}
                  style={{ 
                    width: '100%', 
                    padding: '12px', 
                    border: '1px solid #ccc', 
                    borderRadius: '4px', 
                    fontSize: '16px',
                    backgroundColor: 'white',
                    fontFamily: 'inherit'
                  }}
                />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <input
                  id="input-usuario-senha"
                  type="password"
                  placeholder="Senha"
                  value={novoUsuario.senha}
                  onChange={(e) => setNovoUsuario({...novoUsuario, senha: e.target.value})}
                  style={{ 
                    width: '100%', 
                    padding: '12px', 
                    border: '1px solid #ccc', 
                    borderRadius: '4px', 
                    fontSize: '16px',
                    backgroundColor: 'white',
                    fontFamily: 'inherit'
                  }}
                />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <select
                  id="input-usuario-tipo"
                  value={novoUsuario.tipo}
                  onChange={(e) => setNovoUsuario({...novoUsuario, tipo: e.target.value})}
                  style={{ 
                    width: '100%', 
                    padding: '12px', 
                    border: '1px solid #ccc', 
                    borderRadius: '4px', 
                    fontSize: '16px',
                    backgroundColor: 'white',
                    fontFamily: 'inherit'
                  }}
                >
                  <option value="motorista">Motorista</option>
                  <option value="manutencao">Manutenção</option>
                  <option value="gerencia">Gerência</option>
                </select>
              </div>
              <button
                onClick={adicionarUsuario}
                style={{ 
                  width: '100%', 
                  backgroundColor: '#2563eb', 
                  color: 'white', 
                  padding: '12px 16px', 
                  border: 'none', 
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '500',
                  fontFamily: 'inherit'
                }}
              >
                Adicionar Usuário
              </button>
            </div>
            
            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
              {usuarios.map(usuario => (
                <div key={usuario.id} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  padding: '8px', 
                  backgroundColor: '#f9fafb', 
                  borderRadius: '4px',
                  marginBottom: '4px'
                }}>
                  <div>
                    <span style={{ fontWeight: '500' }}>{usuario.nome}</span>
                    <span style={{ fontSize: '12px', color: '#6b7280', marginLeft: '8px' }}>
                      ({usuario.tipo})
                    </span>
                  </div>
                  <button
                    onClick={() => removerUsuario(usuario.id)}
                    style={{ color: '#dc2626', background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </Modal>
        )}

        {modalAtivo === 'veiculos' && (
          <Modal titulo="Gerenciar Veículos" onFechar={() => setModalAtivo(null)}>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ marginBottom: '12px' }}>
                <input
                  id="input-veiculo-prefixo"
                  type="text"
                  placeholder="Prefixo"
                  value={novoVeiculo.prefixo}
                  onChange={(e) => setNovoVeiculo({...novoVeiculo, prefixo: e.target.value})}
                  style={{ 
                    width: '100%', 
                    padding: '12px', 
                    border: '1px solid #ccc', 
                    borderRadius: '4px', 
                    fontSize: '16px',
                    backgroundColor: 'white',
                    fontFamily: 'inherit'
                  }}
                />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <input
                  id="input-veiculo-placa"
                  type="text"
                  placeholder="Placa"
                  value={novoVeiculo.placa}
                  onChange={(e) => setNovoVeiculo({...novoVeiculo, placa: e.target.value})}
                  style={{ 
                    width: '100%', 
                    padding: '12px', 
                    border: '1px solid #ccc', 
                    borderRadius: '4px', 
                    fontSize: '16px',
                    backgroundColor: 'white',
                    fontFamily: 'inherit'
                  }}
                />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <input
                  id="input-veiculo-modelo"
                  type="text"
                  placeholder="Modelo"
                  value={novoVeiculo.modelo}
                  onChange={(e) => setNovoVeiculo({...novoVeiculo, modelo: e.target.value})}
                  style={{ 
                    width: '100%', 
                    padding: '12px', 
                    border: '1px solid #ccc', 
                    borderRadius: '4px', 
                    fontSize: '16px',
                    backgroundColor: 'white',
                    fontFamily: 'inherit'
                  }}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                <input
                  id="input-veiculo-km"
                  type="number"
                  placeholder="KM Atual"
                  value={novoVeiculo.kmAtual}
                  onChange={(e) => setNovoVeiculo({...novoVeiculo, kmAtual: e.target.value})}
                  style={{ 
                    width: '100%', 
                    padding: '12px', 
                    border: '1px solid #ccc', 
                    borderRadius: '4px',
                    fontSize: '16px',
                    backgroundColor: 'white',
                    fontFamily: 'inherit'
                  }}
                />
                <input
                  id="input-veiculo-revisao"
                  type="number"
                  placeholder="Próxima Revisão (KM)"
                  value={novoVeiculo.proximaRevisao}
                  onChange={(e) => setNovoVeiculo({...novoVeiculo, proximaRevisao: e.target.value})}
                  style={{ 
                    width: '100%', 
                    padding: '12px', 
                    border: '1px solid #ccc', 
                    borderRadius: '4px',
                    fontSize: '16px',
                    backgroundColor: 'white',
                    fontFamily: 'inherit'
                  }}
                />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <select
                  id="input-veiculo-tipo"
                  value={novoVeiculo.tipoRevisao}
                  onChange={(e) => setNovoVeiculo({...novoVeiculo, tipoRevisao: e.target.value})}
                  style={{ 
                    width: '100%', 
                    padding: '12px', 
                    border: '1px solid #ccc', 
                    borderRadius: '4px',
                    fontSize: '16px',
                    backgroundColor: 'white',
                    fontFamily: 'inherit'
                  }}
                >
                  <option value="Revisão 5.000km">Revisão 5.000km</option>
                  <option value="Revisão 10.000km">Revisão 10.000km</option>
                  <option value="Revisão 20.000km">Revisão 20.000km</option>
                  <option value="Revisão 50.000km">Revisão 50.000km</option>
                  <option value="Revisão 100.000km">Revisão 100.000km</option>
                </select>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '12px' }}>
                <button
                  onClick={adicionarVeiculo}
                  style={{ 
                    backgroundColor: '#059669', 
                    color: 'white', 
                    padding: '12px 16px', 
                    border: 'none', 
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: '500',
                    fontFamily: 'inherit'
                  }}
                >
                  Adicionar Veículo
                </button>
                <button
                  onClick={exportarVeiculosExcel}
                  style={{ 
                    backgroundColor: '#2563eb', 
                    color: 'white', 
                    padding: '12px 16px', 
                    border: 'none', 
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: '500',
                    fontFamily: 'inherit'
                  }}
                >
                  📊 Excel
                </button>
              </div>
            </div>
            
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {veiculos.map(veiculo => {
                const precisaRevisao = veiculo.kmAtual >= veiculo.proximaRevisao;
                const diferecaKm = veiculo.proximaRevisao - veiculo.kmAtual;
                
                return (
                  <div key={veiculo.id} style={{ 
                    padding: '12px', 
                    backgroundColor: precisaRevisao ? '#fef2f2' : (veiculo.status === 'manutencao' ? '#fffbeb' : '#f9fafb'), 
                    borderRadius: '6px',
                    marginBottom: '8px',
                    border: precisaRevisao ? '1px solid #fecaca' : '1px solid #e5e7eb'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <div>
                        <span style={{ fontWeight: '600', fontSize: '16px' }}>{veiculo.prefixo}</span>
                        <span style={{ fontSize: '14px', color: '#6b7280', marginLeft: '8px' }}>
                          {veiculo.placa}
                        </span>
                        <span style={{
                          backgroundColor: veiculo.status === 'ativo' ? '#dcfce7' : '#fbbf24',
                          color: veiculo.status === 'ativo' ? '#166534' : 'white',
                          padding: '2px 6px',
                          borderRadius: '10px',
                          fontSize: '11px',
                          marginLeft: '8px'
                        }}>
                          {veiculo.status === 'ativo' ? '✓ ATIVO' : '🔧 MANUTENÇÃO'}
                        </span>
                      </div>
                      <div style={{ display: 'flex', gap: '4px' }}>
                        {veiculo.status === 'manutencao' && (
                          <button
                            onClick={() => liberarVeiculo(veiculo.id)}
                            style={{
                              backgroundColor: '#059669',
                              color: 'white',
                              padding: '4px 8px',
                              border: 'none',
                              borderRadius: '4px',
                              fontSize: '12px',
                              cursor: 'pointer'
                            }}
                          >
                            Liberar
                          </button>
                        )}
                        <button
                          onClick={() => removerVeiculo(veiculo.id)}
                          style={{ color: '#dc2626', background: 'none', border: 'none', cursor: 'pointer' }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    
                    <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '4px' }}>
                      <strong>Modelo:</strong> {veiculo.modelo}
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', fontSize: '12px' }}>
                      <div style={{ 
                        padding: '6px', 
                        backgroundColor: '#f3f4f6', 
                        borderRadius: '4px',
                        textAlign: 'center'
                      }}>
                        <div style={{ color: '#6b7280' }}>KM Atual</div>
                        <div style={{ fontWeight: '600', color: '#1f2937' }}>
                          {veiculo.kmAtual?.toLocaleString() || 'N/A'}
                        </div>
                      </div>
                      <div style={{ 
                        padding: '6px', 
                        backgroundColor: '#f3f4f6', 
                        borderRadius: '4px',
                        textAlign: 'center'
                      }}>
                        <div style={{ color: '#6b7280' }}>Próxima Revisão</div>
                        <div style={{ fontWeight: '600', color: precisaRevisao ? '#dc2626' : '#1f2937' }}>
                          {veiculo.proximaRevisao?.toLocaleString() || 'N/A'}
                        </div>
                      </div>
                      <div style={{ 
                        padding: '6px', 
                        backgroundColor: precisaRevisao ? '#fef2f2' : '#f3f4f6', 
                        borderRadius: '4px',
                        textAlign: 'center'
                      }}>
                        <div style={{ color: '#6b7280' }}>Diferença</div>
                        <div style={{ 
                          fontWeight: '600', 
                          color: precisaRevisao ? '#dc2626' : (diferecaKm <= 1000 ? '#f59e0b' : '#059669')
                        }}>
                          {precisaRevisao ? 'VENCIDA' : `${diferecaKm.toLocaleString()} km`}
                        </div>
                      </div>
                    </div>
                    
                    {precisaRevisao && (
                      <div style={{ 
                        marginTop: '8px', 
                        padding: '6px', 
                        backgroundColor: '#fee2e2', 
                        borderRadius: '4px',
                        fontSize: '12px',
                        color: '#991b1b',
                        textAlign: 'center'
                      }}>
                        ⚠️ REVISÃO {veiculo.tipoRevisao} VENCIDA
                      </div>
                    )}
                    
                    {!precisaRevisao && diferecaKm <= 1000 && (
                      <div style={{ 
                        marginTop: '8px', 
                        padding: '6px', 
                        backgroundColor: '#fef3c7', 
                        borderRadius: '4px',
                        fontSize: '12px',
                        color: '#92400e',
                        textAlign: 'center'
                      }}>
                        🔔 Próximo da revisão ({diferecaKm} km restantes)
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Modal>
        )}

        {modalAtivo === 'cidades' && (
          <Modal titulo="Gerenciar Cidades" onFechar={() => setModalAtivo(null)}>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ marginBottom: '12px' }}>
                <input
                  type="text"
                  placeholder="Nome da cidade"
                  value={novaCidade.nome}
                  onChange={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setNovaCidade({...novaCidade, nome: e.target.value});
                  }}
                  style={{ 
                    width: '100%', 
                    padding: '12px', 
                    border: '1px solid #ccc', 
                    borderRadius: '4px',
                    fontSize: '16px',
                    backgroundColor: 'white'
                  }}
                />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <input
                  type="text"
                  placeholder="UF (ex: SP)"
                  value={novaCidade.uf}
                  onChange={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setNovaCidade({...novaCidade, uf: e.target.value.toUpperCase()});
                  }}
                  maxLength="2"
                  style={{ 
                    width: '100%', 
                    padding: '12px', 
                    border: '1px solid #ccc', 
                    borderRadius: '4px',
                    fontSize: '16px',
                    backgroundColor: 'white'
                  }}
                />
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  adicionarCidade();
                }}
                style={{ 
                  width: '100%', 
                  backgroundColor: '#7c3aed', 
                  color: 'white', 
                  padding: '12px 16px', 
                  border: 'none', 
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '500'
                }}
              >
                Adicionar Cidade
              </button>
            </div>
            
            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
              {cidades.map(cidade => (
                <div key={cidade.id} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  padding: '8px', 
                  backgroundColor: '#f9fafb', 
                  borderRadius: '4px',
                  marginBottom: '4px'
                }}>
                  <span>{cidade.nome} - {cidade.uf}</span>
                </div>
              ))}
            </div>
          </Modal>
        )}

        {modalAtivo === 'revisoes' && (
          <Modal titulo="Revisões Programadas" onFechar={() => setModalAtivo(null)}>
            <div style={{ marginBottom: '16px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>Agendar Nova Revisão</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
                <select
                  value=""
                  onChange={(e) => {
                    const veiculo = veiculos.find(v => v.prefixo === e.target.value);
                    if (veiculo) {
                      const novaRevisaoId = Math.max(...revisoesAgendadas.map(r => r.id), 0) + 1;
                      const kmProximaRevisao = veiculo.kmAtual + 5000;
                      setRevisoesAgendadas([...revisoesAgendadas, {
                        id: novaRevisaoId,
                        prefixo: veiculo.prefixo,
                        tipoRevisao: 'Revisão 5.000km',
                        kmProgramado: kmProximaRevisao,
                        kmAtual: veiculo.kmAtual,
                        status: 'agendada',
                        dataAgendamento: new Date().toISOString().split('T')[0]
                      }]);
                      
                      // Atualizar veículo
                      setVeiculos(veiculos.map(v => 
                        v.prefixo === veiculo.prefixo ? { ...v, proximaRevisao: kmProximaRevisao } : v
                      ));
                      
                      alert(`✅ Revisão agendada para o veículo ${veiculo.prefixo} aos ${kmProximaRevisao.toLocaleString()} km`);
                    }
                  }}
                  style={{ 
                    width: '100%', 
                    padding: '8px', 
                    border: '1px solid #d1d5db', 
                    borderRadius: '4px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="">Selecione um veículo</option>
                  {veiculos.filter(v => v.status === 'ativo').map(veiculo => (
                    <option key={veiculo.id} value={veiculo.prefixo}>
                      {veiculo.prefixo} - {veiculo.placa} (KM: {veiculo.kmAtual?.toLocaleString()})
                    </option>
                  ))}
                </select>
                <button
                  onClick={exportarVeiculosExcel}
                  style={{ 
                    backgroundColor: '#2563eb', 
                    color: 'white', 
                    padding: '8px 12px', 
                    border: 'none', 
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  📊 Exportar Dados
                </button>
              </div>
            </div>
            
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>
                Revisões Agendadas ({revisoesAgendadas.filter(r => r.status !== 'concluida').length})
              </h4>
              
              {revisoesAgendadas.filter(r => r.status !== 'concluida').length === 0 ? (
                <p style={{ color: '#6b7280', textAlign: 'center', padding: '20px' }}>
                  Nenhuma revisão agendada no momento.
                </p>
              ) : (
                revisoesAgendadas.filter(r => r.status !== 'concluida').map(revisao => {
                  const veiculo = veiculos.find(v => v.prefixo === revisao.prefixo);
                  const isUrgente = veiculo && veiculo.kmAtual >= revisao.kmProgramado;
                  const diferenca = revisao.kmProgramado - (veiculo?.kmAtual || 0);
                  
                  return (
                    <div key={revisao.id} style={{ 
                      padding: '12px', 
                      backgroundColor: isUrgente ? '#fef2f2' : '#f9fafb', 
                      borderRadius: '6px',
                      marginBottom: '8px',
                      border: isUrgente ? '1px solid #fecaca' : '1px solid #e5e7eb'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontWeight: '600', fontSize: '16px' }}>{revisao.prefixo}</span>
                          <span style={{
                            backgroundColor: isUrgente ? '#dc2626' : '#f59e0b',
                            color: 'white',
                            padding: '2px 6px',
                            borderRadius: '10px',
                            fontSize: '11px',
                            fontWeight: '500'
                          }}>
                            {isUrgente ? 'URGENTE' : 'AGENDADA'}
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            setRevisoesAgendadas(revisoesAgendadas.filter(r => r.id !== revisao.id));
                            alert(`❌ Revisão do veículo ${revisao.prefixo} foi cancelada.`);
                          }}
                          style={{ color: '#dc2626', background: 'none', border: 'none', cursor: 'pointer' }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '8px', fontSize: '13px' }}>
                        <div>
                          <span style={{ color: '#6b7280' }}>Tipo:</span>
                          <div style={{ fontWeight: '500' }}>{revisao.tipoRevisao}</div>
                        </div>
                        <div>
                          <span style={{ color: '#6b7280' }}>KM Programado:</span>
                          <div style={{ fontWeight: '500' }}>{revisao.kmProgramado.toLocaleString()}</div>
                        </div>
                        <div>
                          <span style={{ color: '#6b7280' }}>KM Atual:</span>
                          <div style={{ fontWeight: '500' }}>{veiculo?.kmAtual?.toLocaleString() || 'N/A'}</div>
                        </div>
                        <div>
                          <span style={{ color: '#6b7280' }}>Status:</span>
                          <div style={{ 
                            fontWeight: '500',
                            color: isUrgente ? '#dc2626' : '#059669'
                          }}>
                            {isUrgente ? `Vencida (${Math.abs(diferenca)} km)` : `${diferenca} km restantes`}
                          </div>
                        </div>
                      </div>
                      
                      {veiculo?.placa && (
                        <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                          {veiculo.placa} - {veiculo.modelo}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
              
              {revisoesAgendadas.filter(r => r.status === 'concluida').length > 0 && (
                <>
                  <h4 style={{ fontSize: '16px', fontWeight: '600', marginTop: '20px', marginBottom: '12px', color: '#059669' }}>
                    Revisões Concluídas ({revisoesAgendadas.filter(r => r.status === 'concluida').length})
                  </h4>
                  {revisoesAgendadas.filter(r => r.status === 'concluida').slice(-5).map(revisao => (
                    <div key={revisao.id} style={{ 
                      padding: '8px 12px', 
                      backgroundColor: '#f0f9ff', 
                      borderRadius: '6px',
                      marginBottom: '4px',
                      border: '1px solid #bae6fd',
                      fontSize: '14px'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: '500' }}>{revisao.prefixo} - {revisao.tipoRevisao}</span>
                        <span style={{
                          backgroundColor: '#059669',
                          color: 'white',
                          padding: '2px 6px',
                          borderRadius: '10px',
                          fontSize: '11px'
                        }}>
                          ✓ CONCLUÍDA
                        </span>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </Modal>
        )}

        {modalAtivo === 'viagens' && (
          <Modal titulo="Relatório de Viagens" onFechar={() => setModalAtivo(null)}>
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {viagens.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#6b7280' }}>Nenhuma viagem realizada ainda.</p>
              ) : (
                viagens.map(viagem => (
                  <div key={viagem.id} style={{ 
                    padding: '16px', 
                    backgroundColor: viagem.temProblemas ? '#fef2f2' : '#f9fafb', 
                    borderRadius: '8px',
                    marginBottom: '8px',
                    border: viagem.temProblemas ? '1px solid #fecaca' : '1px solid #e5e7eb'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <strong>{viagem.motorista}</strong>
                      <span style={{ fontSize: '12px', color: '#6b7280' }}>{viagem.dataHora}</span>
                    </div>
                    <p style={{ margin: '4px 0', fontSize: '14px' }}>
                      <strong>Rota:</strong> {viagem.origem} → {viagem.destino}
                    </p>
                    <p style={{ margin: '4px 0', fontSize: '14px' }}>
                      <strong>Veículo:</strong> {viagem.prefixo} | <strong>KM:</strong> {viagem.kmPercorridos} km
                    </p>
                    {viagem.temProblemas && (
                      <div style={{ marginTop: '8px', padding: '8px', backgroundColor: '#fee2e2', borderRadius: '4px' }}>
                        <span style={{ fontSize: '12px', color: '#991b1b', fontWeight: '500' }}>⚠️ Viagem com ocorrências</span>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </Modal>
        )}

        {modalAtivo === 'ocorrencias' && (
          <Modal titulo="Ocorrências e Problemas" onFechar={() => setModalAtivo(null)}>
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {viagens.filter(v => v.temProblemas).length === 0 ? (
                <p style={{ textAlign: 'center', color: '#6b7280' }}>Nenhuma ocorrência registrada.</p>
              ) : (
                viagens.filter(v => v.temProblemas).map(viagem => (
                  <div key={viagem.id} style={{ 
                    padding: '16px', 
                    backgroundColor: '#fef2f2', 
                    borderRadius: '8px',
                    marginBottom: '8px',
                    border: '1px solid #fecaca'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <strong style={{ color: '#991b1b' }}>{viagem.motorista}</strong>
                      <span style={{ fontSize: '12px', color: '#6b7280' }}>{viagem.dataHora}</span>
                    </div>
                    <p style={{ margin: '4px 0', fontSize: '14px' }}>
                      <strong>Rota:</strong> {viagem.origem} → {viagem.destino}
                    </p>
                    <p style={{ margin: '4px 0', fontSize: '14px' }}>
                      <strong>Veículo:</strong> {viagem.prefixo}
                    </p>
                    {viagem.diversidades && (
                      <p style={{ margin: '4px 0', fontSize: '14px' }}>
                        <strong>Diversidades:</strong> {viagem.diversidades}
                      </p>
                    )}
                    {viagem.ordemServico && (
                      <p style={{ margin: '4px 0', fontSize: '14px' }}>
                        <strong>OS:</strong> {viagem.ordemServico}
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>
          </Modal>
        )}
      </div>
    );
  }

  // DASHBOARD MANUTENÇÃO
  if (tela === 'dashboard-manutencao') {
    const veiculosManutencao = veiculos.filter(v => v.status === 'manutencao');
    const viagensComOS = viagens.filter(v => 
      v.ordemServico && 
      v.ordemServico.trim() !== '' && 
      v.statusManutencao !== 'resolvida'
    );
    const revisoesAgendadasPendentes = revisoesAgendadas.filter(r => r.status !== 'concluida');
    const revisoesUrgentes = revisoesAgendadasPendentes.filter(r => r.kmAtual >= r.kmProgramado);
    
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
        <header style={{ 
          backgroundColor: 'white', 
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          padding: '16px 0'
        }}>
          <div style={{ 
            maxWidth: '1200px', 
            margin: '0 auto', 
            padding: '0 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>
              Painel de Manutenção
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ color: '#6b7280' }}>Olá, {usuarioLogado}</span>
              <button
                onClick={logout}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  color: '#dc2626',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                <LogOut size={20} />
                <span>Sair</span>
              </button>
            </div>
          </div>
        </header>

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
          
          {/* Cards de Status */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginBottom: '24px'
          }}>
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <Wrench style={{ color: '#dc2626', marginRight: '8px' }} size={24} />
                <h3 style={{ fontSize: '16px', fontWeight: '600', margin: 0 }}>Veículos em Manutenção</h3>
              </div>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#dc2626', margin: 0 }}>
                {veiculosManutencao.length}
              </p>
            </div>
            
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <Settings style={{ color: '#f59e0b', marginRight: '8px' }} size={24} />
                <h3 style={{ fontSize: '16px', fontWeight: '600', margin: 0 }}>Revisões Urgentes</h3>
              </div>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#f59e0b', margin: 0 }}>
                {revisoesUrgentes.length}
              </p>
            </div>
            
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <FileText style={{ color: '#2563eb', marginRight: '8px' }} size={24} />
                <h3 style={{ fontSize: '16px', fontWeight: '600', margin: 0 }}>OS Pendentes</h3>
              </div>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#2563eb', margin: 0 }}>
                {viagensComOS.length}
              </p>
            </div>
          </div>

          {/* Revisões Programadas */}
          {revisoesAgendadasPendentes.length > 0 && (
            <div style={{ 
              backgroundColor: 'white', 
              borderRadius: '8px', 
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)', 
              padding: '24px',
              marginBottom: '24px'
            }}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
                <Settings style={{ marginRight: '8px' }} size={24} />
                Revisões Programadas ({revisoesAgendadasPendentes.length})
              </h2>
              
              <div style={{ display: 'grid', gap: '12px' }}>
                {revisoesAgendadasPendentes.map(revisao => {
                  const veiculo = veiculos.find(v => v.prefixo === revisao.prefixo);
                  const isUrgente = revisao.kmAtual >= revisao.kmProgramado;
                  const diferenca = revisao.kmProgramado - revisao.kmAtual;
                  
                  return (
                    <div key={revisao.id} style={{ 
                      padding: '16px', 
                      backgroundColor: isUrgente ? '#fef2f2' : '#fffbeb', 
                      borderRadius: '8px',
                      border: isUrgente ? '1px solid #fecaca' : '1px solid #fed7aa'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <strong style={{ color: isUrgente ? '#991b1b' : '#92400e', fontSize: '16px' }}>
                            {revisao.prefixo}
                          </strong>
                          <span style={{
                            backgroundColor: isUrgente ? '#dc2626' : '#f59e0b',
                            color: 'white',
                            padding: '2px 8px',
                            borderRadius: '12px',
                            fontSize: '12px',
                            fontWeight: '500'
                          }}>
                            {isUrgente ? 'URGENTE' : 'AGENDADA'}
                          </span>
                          <span style={{ fontSize: '14px', color: '#6b7280' }}>
                            {veiculo?.placa} - {veiculo?.modelo}
                          </span>
                        </div>
                        <button
                          onClick={() => processarRevisao(revisao.id)}
                          style={{
                            backgroundColor: '#059669',
                            color: 'white',
                            padding: '8px 16px',
                            border: 'none',
                            borderRadius: '4px',
                            fontSize: '14px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <CheckCircle size={16} />
                          Concluir Revisão
                        </button>
                      </div>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '12px', fontSize: '14px' }}>
                        <div>
                          <span style={{ color: '#6b7280' }}>Tipo:</span>
                          <div style={{ fontWeight: '500' }}>{revisao.tipoRevisao}</div>
                        </div>
                        <div>
                          <span style={{ color: '#6b7280' }}>KM Programado:</span>
                          <div style={{ fontWeight: '500' }}>{revisao.kmProgramado.toLocaleString()}</div>
                        </div>
                        <div>
                          <span style={{ color: '#6b7280' }}>KM Atual:</span>
                          <div style={{ fontWeight: '500' }}>{revisao.kmAtual.toLocaleString()}</div>
                        </div>
                        <div>
                          <span style={{ color: '#6b7280' }}>Status:</span>
                          <div style={{ 
                            fontWeight: '500',
                            color: isUrgente ? '#dc2626' : '#92400e'
                          }}>
                            {isUrgente ? `Vencida (${Math.abs(diferenca)} km)` : `${diferenca} km restantes`}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Veículos em Manutenção */}
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '8px', 
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)', 
            padding: '24px',
            marginBottom: '24px'
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
              <Wrench style={{ marginRight: '8px' }} size={24} />
              Veículos em Manutenção ({veiculosManutencao.length})
            </h2>
            
            {veiculosManutencao.length === 0 ? (
              <p style={{ color: '#6b7280', textAlign: 'center', padding: '20px' }}>
                Nenhum veículo em manutenção no momento.
              </p>
            ) : (
              <div>
                {veiculosManutencao.map(veiculo => {
                  // Buscar viagens com OS para este veículo (não resolvidas)
                  const viagensVeiculo = viagens.filter(v => 
                    v.prefixo === veiculo.prefixo && 
                    v.statusManutencao !== 'resolvida' &&
                    (v.ordemServico?.trim() || v.checklist?.some(c => c.status === 'nao-conforme'))
                  );
                  
                  const osResolvidas = viagens.filter(v => 
                    v.prefixo === veiculo.prefixo && 
                    v.statusManutencao === 'resolvida'
                  ).length;
                  
                  const podeLiberarVeiculo = viagensVeiculo.length === 0;
                  
                  return (
                    <div key={veiculo.id} style={{ 
                      padding: '16px', 
                      backgroundColor: podeLiberarVeiculo ? '#f0f9ff' : '#fef2f2', 
                      borderRadius: '8px',
                      marginBottom: '12px',
                      border: podeLiberarVeiculo ? '1px solid #bae6fd' : '1px solid #fecaca'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <div>
                          <span style={{ fontWeight: '500', fontSize: '16px' }}>{veiculo.prefixo}</span>
                          <span style={{ fontSize: '14px', color: '#6b7280', marginLeft: '8px' }}>
                            {veiculo.placa} - {veiculo.modelo}
                          </span>
                          <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '2px' }}>
                            KM Atual: {veiculo.kmAtual?.toLocaleString()} | {viagensVeiculo.length} OS pendente(s) | {osResolvidas} OS resolvida(s)
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          {podeLiberarVeiculo ? (
                            <button
                              onClick={() => liberarVeiculo(veiculo.id)}
                              style={{
                                backgroundColor: '#059669',
                                color: 'white',
                                padding: '8px 16px',
                                border: 'none',
                                borderRadius: '4px',
                                fontSize: '14px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                              }}
                            >
                              <CheckCircle size={16} />
                              Liberar Veículo
                            </button>
                          ) : (
                            <div style={{
                              backgroundColor: '#fbbf24',
                              color: 'white',
                              padding: '8px 16px',
                              borderRadius: '4px',
                              fontSize: '14px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}>
                              <AlertTriangle size={16} />
                              Pendências
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Mostrar problemas relacionados */}
                      {viagensVeiculo.length > 0 && (
                        <div style={{ marginTop: '12px' }}>
                          <strong style={{ fontSize: '14px', color: '#991b1b' }}>Ordens de Serviço Pendentes:</strong>
                          {viagensVeiculo.slice(-3).map(viagem => (
                            <div key={viagem.id} style={{ 
                              marginTop: '8px', 
                              padding: '12px', 
                              backgroundColor: '#fee2e2', 
                              borderRadius: '4px',
                              fontSize: '13px'
                            }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                                <div><strong>Data:</strong> {viagem.dataHora}</div>
                                <button
                                  onClick={() => processarOS(viagem.id)}
                                  style={{
                                    backgroundColor: '#059669',
                                    color: 'white',
                                    padding: '4px 8px',
                                    border: 'none',
                                    borderRadius: '4px',
                                    fontSize: '11px',
                                    cursor: 'pointer'
                                  }}
                                >
                                  ✓ Resolver
                                </button>
                              </div>
                              <div><strong>Motorista:</strong> {viagem.motorista}</div>
                              {viagem.ordemServico && (
                                <div style={{ 
                                  marginTop: '6px', 
                                  padding: '6px', 
                                  backgroundColor: '#fecaca', 
                                  borderRadius: '3px',
                                  whiteSpace: 'pre-wrap'
                                }}>
                                  <strong>OS:</strong> {viagem.ordemServico}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Resumo de Ordens de Serviço por Tipo */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '16px',
            marginBottom: '24px'
          }}>
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                <Settings style={{ color: '#dc2626', marginRight: '8px' }} size={24} />
                <h3 style={{ fontSize: '16px', fontWeight: '600', margin: 0 }}>OS do Checklist</h3>
              </div>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#dc2626', margin: 0 }}>
                {viagensComOS.filter(v => v.ordemServico?.includes('CHECKLIST')).length}
              </p>
              <p style={{ fontSize: '12px', color: '#6b7280', margin: '4px 0 0 0' }}>
                Itens não conformes
              </p>
            </div>
            
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                <FileText style={{ color: '#f59e0b', marginRight: '8px' }} size={24} />
                <h3 style={{ fontSize: '16px', fontWeight: '600', margin: 0 }}>OS Manuais</h3>
              </div>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#f59e0b', margin: 0 }}>
                {viagensComOS.filter(v => v.ordemServico && !v.ordemServico.includes('CHECKLIST')).length}
              </p>
              <p style={{ fontSize: '12px', color: '#6b7280', margin: '4px 0 0 0' }}>
                Relatadas pelo motorista
              </p>
            </div>
            
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                <CheckCircle style={{ color: '#059669', marginRight: '8px' }} size={24} />
                <h3 style={{ fontSize: '16px', fontWeight: '600', margin: 0 }}>OS Resolvidas</h3>
              </div>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#059669', margin: 0 }}>
                {viagens.filter(v => v.statusManutencao === 'resolvida').length}
              </p>
              <p style={{ fontSize: '12px', color: '#6b7280', margin: '4px 0 0 0' }}>
                Concluídas
              </p>
            </div>
          </div>

          {/* Lista Detalhada de OS Pendentes */}
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '8px', 
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)', 
            padding: '24px'
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
              <FileText style={{ marginRight: '8px' }} size={24} />
              Todas as Ordens de Serviço Pendentes ({viagensComOS.length})
            </h2>
            
            {viagensComOS.length === 0 ? (
              <p style={{ color: '#6b7280', textAlign: 'center', padding: '20px' }}>
                🎉 Nenhuma ordem de serviço pendente! Todos os veículos estão em ordem.
              </p>
            ) : (
              <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {viagensComOS.map(viagem => {
                  const isChecklistOS = viagem.ordemServico?.includes('CHECKLIST');
                  
                  return (
                    <div key={viagem.id} style={{ 
                      padding: '16px', 
                      backgroundColor: isChecklistOS ? '#fef2f2' : '#fffbeb', 
                      borderRadius: '8px',
                      marginBottom: '8px',
                      border: isChecklistOS ? '1px solid #fecaca' : '1px solid #fed7aa'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <strong style={{ color: isChecklistOS ? '#991b1b' : '#92400e' }}>
                            Veículo: {viagem.prefixo}
                          </strong>
                          <span style={{
                            backgroundColor: isChecklistOS ? '#dc2626' : '#f59e0b',
                            color: 'white',
                            padding: '2px 6px',
                            borderRadius: '10px',
                            fontSize: '11px',
                            fontWeight: '500'
                          }}>
                            {isChecklistOS ? 'CHECKLIST' : 'MANUAL'}
                          </span>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            onClick={() => colocarEmManutencao(viagem.prefixo)}
                            style={{
                              backgroundColor: '#dc2626',
                              color: 'white',
                              padding: '4px 8px',
                              border: 'none',
                              borderRadius: '4px',
                              fontSize: '12px',
                              cursor: 'pointer'
                            }}
                          >
                            🔧 Manutenção
                          </button>
                          <button
                            onClick={() => processarOS(viagem.id)}
                            style={{
                              backgroundColor: '#059669',
                              color: 'white',
                              padding: '4px 8px',
                              border: 'none',
                              borderRadius: '4px',
                              fontSize: '12px',
                              cursor: 'pointer'
                            }}
                          >
                            ✓ Resolver
                          </button>
                        </div>
                      </div>
                      <p style={{ margin: '4px 0', fontSize: '14px' }}>
                        <strong>Data:</strong> {viagem.dataHora} | <strong>Motorista:</strong> {viagem.motorista}
                      </p>
                      <p style={{ margin: '4px 0', fontSize: '14px' }}>
                        <strong>Rota:</strong> {viagem.origem} → {viagem.destino}
                      </p>
                      <div style={{ 
                        marginTop: '12px', 
                        padding: '12px', 
                        backgroundColor: isChecklistOS ? '#fee2e2' : '#fef3c7', 
                        borderRadius: '4px',
                        borderLeft: `4px solid ${isChecklistOS ? '#dc2626' : '#f59e0b'}`
                      }}>
                        <strong style={{ color: isChecklistOS ? '#991b1b' : '#92400e' }}>
                          {isChecklistOS ? '🔍 Problemas Detectados no Checklist:' : '📝 Ordem de Serviço Manual:'}
                        </strong>
                        <p style={{ 
                          margin: '4px 0 0 0', 
                          color: isChecklistOS ? '#991b1b' : '#92400e',
                          whiteSpace: 'pre-wrap',
                          fontSize: '14px'
                        }}>
                          {viagem.ordemServico}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // DASHBOARD GERÊNCIA
  if (tela === 'dashboard-gerencia') {
    const motoristas = usuarios.filter(u => u.tipo === 'motorista');
    const viagensComProblemas = viagens.filter(v => v.temProblemas).length;
    const totalKm = viagens.reduce((total, viagem) => total + viagem.kmPercorridos, 0);
    
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
        <header style={{ 
          backgroundColor: 'white', 
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          padding: '16px 0'
        }}>
          <div style={{ 
            maxWidth: '1200px', 
            margin: '0 auto', 
            padding: '0 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>
              Painel Gerencial
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ color: '#6b7280' }}>Olá, {usuarioLogado}</span>
              <button
                onClick={logout}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  color: '#dc2626',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                <LogOut size={20} />
                <span>Sair</span>
              </button>
            </div>
          </div>
        </header>

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
          {/* Cards de estatísticas */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '24px',
            marginBottom: '32px'
          }}>
            <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Users style={{ color: '#2563eb', marginRight: '12px' }} size={32} />
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>Motoristas</h3>
                  <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#2563eb', margin: '4px 0 0 0' }}>
                    {motoristas.length}
                  </p>
                </div>
              </div>
            </div>
            
            <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Truck style={{ color: '#059669', marginRight: '12px' }} size={32} />
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>Veículos</h3>
                  <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#059669', margin: '4px 0 0 0' }}>
                    {veiculos.length}
                  </p>
                </div>
              </div>
            </div>
            
            <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FileText style={{ color: '#ea580c', marginRight: '12px' }} size={32} />
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>Total Viagens</h3>
                  <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#ea580c', margin: '4px 0 0 0' }}>
                    {viagens.length}
                  </p>
                </div>
              </div>
            </div>

            <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <MapPin style={{ color: '#7c3aed', marginRight: '12px' }} size={32} />
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>Total KM</h3>
                  <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#7c3aed', margin: '4px 0 0 0' }}>
                    {totalKm.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <AlertTriangle style={{ color: '#dc2626', marginRight: '12px' }} size={32} />
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>Ocorrências</h3>
                  <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#dc2626', margin: '4px 0 0 0' }}>
                    {viagensComProblemas}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Relatório Resumido de Viagens */}
          {viagens.length > 0 && (
            <div style={{ 
              backgroundColor: 'white', 
              borderRadius: '8px', 
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)', 
              padding: '24px'
            }}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
                <FileText style={{ marginRight: '8px' }} size={24} />
                Relatório de Viagens (Últimas 10)
              </h2>
              
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f9fafb' }}>
                      <th style={{ padding: '8px 16px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Data/Hora</th>
                      <th style={{ padding: '8px 16px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Motorista</th>
                      <th style={{ padding: '8px 16px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Rota</th>
                      <th style={{ padding: '8px 16px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Veículo</th>
                      <th style={{ padding: '8px 16px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>KM</th>
                      <th style={{ padding: '8px 16px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {viagens.slice(-10).reverse().map(viagem => (
                      <tr key={viagem.id} style={{ 
                        borderBottom: '1px solid #f3f4f6',
                        backgroundColor: viagem.temProblemas ? '#fef2f2' : 'white'
                      }}>
                        <td style={{ padding: '8px 16px', fontSize: '14px' }}>{viagem.dataHora}</td>
                        <td style={{ padding: '8px 16px', fontSize: '14px' }}>{viagem.motorista}</td>
                        <td style={{ padding: '8px 16px', fontSize: '14px' }}>{viagem.origem} → {viagem.destino}</td>
                        <td style={{ padding: '8px 16px', fontSize: '14px' }}>{viagem.prefixo}</td>
                        <td style={{ padding: '8px 16px', fontSize: '14px' }}>{viagem.kmPercorridos} km</td>
                        <td style={{ padding: '8px 16px' }}>
                          {viagem.temProblemas ? (
                            <div style={{ display: 'flex', alignItems: 'center', color: '#dc2626' }}>
                              <AlertTriangle size={16} style={{ marginRight: '4px' }} />
                              <span style={{ fontSize: '12px' }}>Com Ocorrências</span>
                            </div>
                          ) : (
                            <div style={{ display: 'flex', alignItems: 'center', color: '#059669' }}>
                              <CheckCircle size={16} style={{ marginRight: '4px' }} />
                              <span style={{ fontSize: '12px' }}>Normal</span>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // SISTEMA DE CONTROLE DE VIAGEM (MOTORISTAS) - Mantém o código original
  if (tela === 'controle-viagem') {
    if (etapa === 'inicial') {
      return (
        <div style={{ 
          minHeight: '100vh', 
          background: 'linear-gradient(135deg, #bfdbfe 0%, #dbeafe 100%)',
          padding: '16px'
        }}>
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e3a8a' }}>
              Sistema de Controle de Viagem
            </h1>
            <button
              onClick={logout}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                color: '#dc2626',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              <LogOut size={20} />
              <span>Sair</span>
            </button>
          </header>
          
          <div style={{
            maxWidth: '500px',
            margin: '0 auto',
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            padding: '32px'
          }}>
            
            {/* Campo Motorista */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                fontSize: '14px', 
                fontWeight: '500', 
                color: '#374151',
                marginBottom: '8px'
              }}>
                Motorista
              </label>
              <input
                type="text"
                value={dadosViagem.motorista}
                disabled
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  backgroundColor: '#f3f4f6',
                  color: '#6b7280',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {/* Origem e Destino */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
              <div style={{ position: 'relative' }}>
                <label style={{ 
                  display: 'block', 
                  fontSize: '14px', 
                  fontWeight: '500', 
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Origem
                </label>
                <input
                  type="text"
                  value={dadosViagem.origem}
                  onChange={(e) => {
                    handleInputChange('origem', e.target.value);
                    buscarCidades(e.target.value, 'origem');
                  }}
                  onBlur={() => setTimeout(() => setMostrarSugestoesOrigem(false), 300)}
                  onFocus={() => {
                    if (dadosViagem.origem.length >= 2) {
                      buscarCidades(dadosViagem.origem, 'origem');
                    }
                  }}
                  placeholder="Digite ou selecione a origem"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '16px',
                    boxSizing: 'border-box'
                  }}
                />
                {mostrarSugestoesOrigem && sugestoesOrigem.length > 0 && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    zIndex: 10,
                    backgroundColor: 'white',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    maxHeight: '160px',
                    overflowY: 'auto',
                    marginTop: '4px'
                  }}>
                    {sugestoesOrigem.map(cidade => (
                      <button
                        key={cidade.id}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          selecionarCidade(cidade, 'origem');
                        }}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '12px',
                          border: 'none',
                          borderBottom: '1px solid #f3f4f6',
                          backgroundColor: 'white',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#f8fafc'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                      >
                        <span style={{ fontWeight: '500' }}>{cidade.nome}</span>
                        <span style={{ color: '#6b7280', marginLeft: '8px' }}>- {cidade.uf}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <div style={{ position: 'relative' }}>
                <label style={{ 
                  display: 'block', 
                  fontSize: '14px', 
                  fontWeight: '500', 
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Destino
                </label>
                <input
                  type="text"
                  value={dadosViagem.destino}
                  onChange={(e) => {
                    handleInputChange('destino', e.target.value);
                    buscarCidades(e.target.value, 'destino');
                  }}
                  onBlur={() => setTimeout(() => setMostrarSugestoesDestino(false), 300)}
                  onFocus={() => {
                    if (dadosViagem.destino.length >= 2) {
                      buscarCidades(dadosViagem.destino, 'destino');
                    }
                  }}
                  placeholder="Digite ou selecione o destino"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '16px',
                    boxSizing: 'border-box'
                  }}
                />
                {mostrarSugestoesDestino && sugestoesDestino.length > 0 && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    zIndex: 10,
                    backgroundColor: 'white',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    maxHeight: '160px',
                    overflowY: 'auto',
                    marginTop: '4px'
                  }}>
                    {sugestoesDestino.map(cidade => (
                      <button
                        key={cidade.id}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          selecionarCidade(cidade, 'destino');
                        }}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '12px',
                          border: 'none',
                          borderBottom: '1px solid #f3f4f6',
                          backgroundColor: 'white',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#f8fafc'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                      >
                        <span style={{ fontWeight: '500' }}>{cidade.nome}</span>
                        <span style={{ color: '#6b7280', marginLeft: '8px' }}>- {cidade.uf}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Prefixo e KM Inicial */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
              <div>
                <label style={{ 
                  display: 'block', 
                  fontSize: '14px', 
                  fontWeight: '500', 
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Prefixo do Ônibus
                </label>
                <select
                  value={dadosViagem.prefixo}
                  onChange={(e) => {
                    handleInputChange('prefixo', e.target.value);
                    // Auto-preencher KM inicial com KM atual do veículo
                    if (e.target.value) {
                      const veiculoSelecionado = veiculos.find(v => v.prefixo === e.target.value);
                      if (veiculoSelecionado && veiculoSelecionado.kmAtual) {
                        handleInputChange('kmInicial', veiculoSelecionado.kmAtual.toString());
                      }
                    }
                  }}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '16px',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="">Selecione</option>
                  {veiculos.map(veiculo => (
                    <option key={veiculo.id} value={veiculo.prefixo}>
                      {veiculo.prefixo} - {veiculo.placa} {veiculo.status === 'manutencao' ? '(⚠️ Em Manutenção)' : ''} - KM: {veiculo.kmAtual?.toLocaleString() || 'N/A'}
                    </option>
                  ))}
                </select>
                
                {/* Aviso de veículo com pendências */}
                {dadosViagem.prefixo && veiculos.find(v => v.prefixo === dadosViagem.prefixo)?.status === 'manutencao' && (
                  <div style={{
                    marginTop: '8px',
                    padding: '12px',
                    backgroundColor: '#fffbeb',
                    border: '1px solid #fed7aa',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <AlertTriangle size={20} style={{ color: '#f59e0b', flexShrink: 0 }} />
                    <div>
                      <div style={{ fontWeight: '600', color: '#92400e', fontSize: '14px' }}>
                        ⚠️ Veículo com Pendências
                      </div>
                      <div style={{ fontSize: '13px', color: '#92400e', marginTop: '2px' }}>
                        Este veículo possui pendências de manutenção. Viagem permitida, mas informe qualquer problema encontrado.
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div>
                <label style={{ 
                  display: 'block', 
                  fontSize: '14px', 
                  fontWeight: '500', 
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  KM Inicial
                </label>
                <input
                  type="number"
                  value={dadosViagem.kmInicial}
                  onChange={(e) => handleInputChange('kmInicial', e.target.value)}
                  placeholder={dadosViagem.prefixo ? `KM atual: ${veiculos.find(v => v.prefixo === dadosViagem.prefixo)?.kmAtual?.toLocaleString() || 'N/A'}` : 'KM'}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '16px',
                    boxSizing: 'border-box'
                  }}
                />
                {dadosViagem.prefixo && (
                  <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                    💡 KM atual do veículo: {veiculos.find(v => v.prefixo === dadosViagem.prefixo)?.kmAtual?.toLocaleString() || 'N/A'}
                  </div>
                )}
              </div>
            </div>

            {/* Checklist */}
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '16px' }}>
                Checklist de Verificação
              </h3>
              <div>
                {checklist.map((item, index) => (
                  <div key={index} style={{ 
                    backgroundColor: '#f9fafb', 
                    borderRadius: '8px', 
                    padding: '16px',
                    marginBottom: '12px'
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      marginBottom: item.status === 'nao-conforme' ? '12px' : 0
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontWeight: '500' }}>{item.item}</span>
                        {item.obrigatorio ? (
                          <span style={{
                            backgroundColor: '#fef2f2',
                            color: '#991b1b',
                            padding: '2px 8px',
                            borderRadius: '12px',
                            fontSize: '12px'
                          }}>
                            Obrigatório
                          </span>
                        ) : (
                          <span style={{
                            backgroundColor: '#eff6ff',
                            color: '#1d4ed8',
                            padding: '2px 8px',
                            borderRadius: '12px',
                            fontSize: '12px'
                          }}>
                            Opcional
                          </span>
                        )}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <button
                          onClick={() => handleChecklistChange(index, 'status', 'conforme')}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '4px',
                            fontSize: '14px',
                            fontWeight: '500',
                            border: 'none',
                            cursor: 'pointer',
                            backgroundColor: item.status === 'conforme' ? '#059669' : '#e5e7eb',
                            color: item.status === 'conforme' ? 'white' : '#374151'
                          }}
                        >
                          Conforme
                        </button>
                        <button
                          onClick={() => handleChecklistChange(index, 'status', 'nao-conforme')}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '4px',
                            fontSize: '14px',
                            fontWeight: '500',
                            border: 'none',
                            cursor: 'pointer',
                            backgroundColor: item.status === 'nao-conforme' ? '#dc2626' : '#e5e7eb',
                            color: item.status === 'nao-conforme' ? 'white' : '#374151'
                          }}
                        >
                          Não Conforme
                        </button>
                        <button
                          onClick={() => handleChecklistChange(index, 'foto', !item.foto)}
                          style={{
                            padding: '8px',
                            borderRadius: '4px',
                            border: 'none',
                            cursor: 'pointer',
                            backgroundColor: item.foto ? '#2563eb' : '#d1d5db',
                            color: item.foto ? 'white' : '#6b7280'
                          }}
                          title="Tirar foto"
                        >
                          <Camera size={16} />
                        </button>
                      </div>
                    </div>
                    {item.status === 'nao-conforme' && (
                      <textarea
                        placeholder="Descreva o problema encontrado..."
                        value={item.observacao}
                        onChange={(e) => handleChecklistChange(index, 'observacao', e.target.value)}
                        style={{
                          width: '100%',
                          padding: '8px',
                          fontSize: '14px',
                          border: '1px solid #d1d5db',
                          borderRadius: '4px',
                          resize: 'none',
                          rows: 2,
                          boxSizing: 'border-box'
                        }}
                        rows="2"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Botão Iniciar Viagem */}
            <button
              onClick={iniciarViagem}
              disabled={!podeIniciarViagem()}
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                color: 'white',
                border: 'none',
                cursor: podeIniciarViagem() ? 'pointer' : 'not-allowed',
                backgroundColor: podeIniciarViagem() ? '#16a34a' : '#9ca3af',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <Play size={24} />
              <span>Iniciar Viagem</span>
            </button>
          </div>
        </div>
      );
    }

    if (etapa === 'viagem') {
      return (
        <div style={{ 
          minHeight: '100vh', 
          background: 'linear-gradient(135deg, #bbf7d0 0%, #dcfce7 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}>
          <div style={{
            maxWidth: '500px',
            margin: '0 auto',
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            padding: '40px',
            textAlign: 'center'
          }}>
            <div style={{ marginBottom: '32px' }}>
              <div style={{
                width: '80px',
                height: '80px',
                backgroundColor: '#16a34a',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto'
              }}>
                <Play style={{ color: 'white' }} size={40} />
              </div>
              <h2 style={{ 
                fontSize: '32px', 
                fontWeight: 'bold', 
                color: '#16a34a',
                margin: '0 0 8px 0'
              }}>
                Boa Viagem!
              </h2>
              <p style={{ color: '#6b7280', marginBottom: '4px' }}>
                Viagem de {dadosViagem.origem} para {dadosViagem.destino}
              </p>
              <p style={{ fontSize: '14px', color: '#9ca3af' }}>
                Ônibus: {dadosViagem.prefixo} | Motorista: {dadosViagem.motorista}
              </p>
            </div>

            <button
              onClick={finalizarViagem}
              style={{
                width: '100%',
                backgroundColor: '#dc2626',
                color: 'white',
                padding: '16px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <Square size={24} />
              <span>Finalizar Viagem</span>
            </button>
          </div>
        </div>
      );
    }

    if (etapa === 'finalizacao') {
      const kmInicial = parseFloat(dadosViagem.kmInicial);
      const kmFinal = parseFloat(dadosViagem.kmFinal);
      const kmInvalido = dadosViagem.kmFinal && kmFinal <= kmInicial;
      
      return (
        <div style={{ 
          minHeight: '100vh', 
          background: 'linear-gradient(135deg, #fed7aa 0%, #fef3c7 100%)',
          padding: '16px'
        }}>
          <div style={{
            maxWidth: '500px',
            margin: '0 auto',
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            padding: '32px'
          }}>
            <h2 style={{ 
              fontSize: '24px', 
              fontWeight: 'bold', 
              color: '#ea580c',
              marginBottom: '24px',
              textAlign: 'center'
            }}>
              Finalização da Viagem
            </h2>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                fontSize: '14px', 
                fontWeight: '500', 
                color: '#374151',
                marginBottom: '8px'
              }}>
                KM Final
              </label>
              <input
                type="number"
                value={dadosViagem.kmFinal}
                onChange={(e) => handleInputChange('kmFinal', e.target.value)}
                placeholder="Quilometragem final"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: kmInvalido ? '1px solid #dc2626' : '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '16px',
                  backgroundColor: kmInvalido ? '#fef2f2' : 'white',
                  boxSizing: 'border-box'
                }}
              />
              {kmInvalido && (
                <div style={{
                  marginTop: '8px',
                  padding: '8px',
                  backgroundColor: '#fef2f2',
                  border: '1px solid #fecaca',
                  borderRadius: '4px',
                  color: '#b91c1c',
                  fontSize: '14px'
                }}>
                  <strong>⚠️ Erro:</strong> KM final ({kmFinal}) deve ser maior que KM inicial ({kmInicial})
                </div>
              )}
              <div style={{ marginTop: '4px', fontSize: '12px', color: '#6b7280' }}>
                KM inicial da viagem: {dadosViagem.kmInicial}
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                fontSize: '14px', 
                fontWeight: '500', 
                color: '#374151',
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <FileText size={16} />
                Relatar Diversidades da Viagem
              </label>
              <textarea
                value={dadosViagem.diversidades}
                onChange={(e) => handleInputChange('diversidades', e.target.value)}
                placeholder="Descreva qualquer ocorrência durante a viagem..."
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '16px',
                  height: '80px',
                  resize: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                fontSize: '14px', 
                fontWeight: '500', 
                color: '#374151',
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Wrench size={16} />
                Ordem de Serviço
              </label>
              <textarea
                value={dadosViagem.ordemServico}
                onChange={(e) => handleInputChange('ordemServico', e.target.value)}
                placeholder="Serviços necessários no veículo..."
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '16px',
                  height: '80px',
                  resize: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ 
              backgroundColor: '#f9fafb', 
              padding: '16px', 
              borderRadius: '8px',
              marginBottom: '24px'
            }}>
              <h4 style={{ fontWeight: '600', color: '#374151', marginBottom: '8px' }}>Resumo da Viagem:</h4>
              <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
                <p style={{ margin: '4px 0' }}><strong>Motorista:</strong> {dadosViagem.motorista}</p>
                <p style={{ margin: '4px 0' }}><strong>Rota:</strong> {dadosViagem.origem} → {dadosViagem.destino}</p>
                <p style={{ margin: '4px 0' }}><strong>Ônibus:</strong> {dadosViagem.prefixo}</p>
                <p style={{ margin: '4px 0' }}><strong>KM Inicial:</strong> {dadosViagem.kmInicial}</p>
                {dadosViagem.kmFinal && (
                  <p style={{ margin: '4px 0' }}><strong>KM Percorridos:</strong> {dadosViagem.kmFinal - dadosViagem.kmInicial} km</p>
                )}
              </div>
            </div>

            <button
              onClick={concluirViagem}
              disabled={kmInvalido || !dadosViagem.kmFinal}
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                color: 'white',
                border: 'none',
                cursor: (kmInvalido || !dadosViagem.kmFinal) ? 'not-allowed' : 'pointer',
                backgroundColor: (kmInvalido || !dadosViagem.kmFinal) ? '#9ca3af' : '#2563eb'
              }}
            >
              {kmInvalido ? 'Corrija o KM Final' : 'Concluir Viagem'}
            </button>
          </div>
        </div>
      );
    }

    if (etapa === 'concluida') {
      const itensNaoConformes = checklist.filter(item => item.status === 'nao-conforme');
      const temProblemasGraves = itensNaoConformes.length > 0 || dadosViagem.ordemServico.trim() !== '';
      
      return (
        <div style={{ 
          minHeight: '100vh', 
          background: 'linear-gradient(135deg, #bfdbfe 0%, #dbeafe 100%)',
          padding: '16px'
        }}>
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e3a8a' }}>
              Sistema de Controle de Viagem
            </h1>
            <button
              onClick={logout}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                color: '#dc2626',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              <LogOut size={20} />
              <span>Sair</span>
            </button>
          </header>
          
          <div style={{
            maxWidth: '500px',
            margin: '0 auto',
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            padding: '40px',
            textAlign: 'center'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              backgroundColor: temProblemasGraves ? '#f59e0b' : '#2563eb',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto'
            }}>
              {temProblemasGraves ? (
                <AlertTriangle style={{ color: 'white' }} size={40} />
              ) : (
                <CheckCircle style={{ color: 'white' }} size={40} />
              )}
            </div>
            <h2 style={{ 
              fontSize: '24px', 
              fontWeight: 'bold', 
              color: temProblemasGraves ? '#f59e0b' : '#2563eb',
              marginBottom: '16px'
            }}>
              Viagem Concluída!
            </h2>
            
            {temProblemasGraves ? (
              <div style={{
                backgroundColor: '#fffbeb',
                border: '1px solid #fed7aa',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '24px',
                textAlign: 'left'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <Wrench style={{ color: '#f59e0b', marginRight: '8px' }} size={20} />
                  <strong style={{ color: '#92400e' }}>Veículo Enviado para Manutenção</strong>
                </div>
                <p style={{ color: '#92400e', fontSize: '14px', margin: '0 0 8px 0' }}>
                  Foram detectados problemas que necessitam atenção:
                </p>
                <ul style={{ color: '#92400e', fontSize: '13px', margin: '0', paddingLeft: '20px' }}>
                  {itensNaoConformes.map((item, idx) => (
                    <li key={idx} style={{ marginBottom: '4px' }}>
                      <strong>{item.item}:</strong> {item.observacao || 'Não conforme'}
                    </li>
                  ))}
                  {dadosViagem.ordemServico.trim() && (
                    <li style={{ marginBottom: '4px' }}>
                      <strong>OS Manual:</strong> {dadosViagem.ordemServico.substring(0, 50)}...
                    </li>
                  )}
                </ul>
                <div style={{ 
                  marginTop: '12px', 
                  padding: '8px', 
                  backgroundColor: '#fef3c7', 
                  borderRadius: '4px',
                  fontSize: '12px',
                  color: '#92400e'
                }}>
                  🔧 O veículo {dadosViagem.prefixo} foi automaticamente colocado em manutenção e não estará disponível até a liberação.
                </div>
              </div>
            ) : (
              <p style={{ color: '#6b7280', marginBottom: '24px' }}>
                Todos os dados foram salvos com sucesso. Nenhum problema detectado!
              </p>
            )}
            
            <div style={{ 
              backgroundColor: '#f9fafb', 
              padding: '16px', 
              borderRadius: '8px',
              marginBottom: '24px',
              textAlign: 'left'
            }}>
              <h4 style={{ fontWeight: '600', color: '#374151', marginBottom: '8px' }}>Relatório Final:</h4>
              <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
                <p style={{ margin: '4px 0' }}><strong>Motorista:</strong> {dadosViagem.motorista}</p>
                <p style={{ margin: '4px 0' }}><strong>Rota:</strong> {dadosViagem.origem} → {dadosViagem.destino}</p>
                <p style={{ margin: '4px 0' }}><strong>Ônibus:</strong> {dadosViagem.prefixo}</p>
                <p style={{ margin: '4px 0' }}><strong>KM Percorridos:</strong> {dadosViagem.kmFinal - dadosViagem.kmInicial} km</p>
                {dadosViagem.diversidades && (
                  <p style={{ margin: '4px 0' }}><strong>Diversidades:</strong> {dadosViagem.diversidades}</p>
                )}
                {dadosViagem.ordemServico && (
                  <p style={{ margin: '4px 0' }}><strong>Ordem de Serviço:</strong> {dadosViagem.ordemServico}</p>
                )}
              </div>
            </div>

            <button
              onClick={novaViagem}
              style={{
                width: '100%',
                backgroundColor: '#16a34a',
                color: 'white',
                padding: '16px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Nova Viagem
            </button>
          </div>
        </div>
      );
    }
  }

  // TELA DE DETALHES DA VIAGEM
  if (tela === 'detalhes-viagem') {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
        <header style={{ 
          backgroundColor: 'white', 
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          padding: '16px 0'
        }}>
          <div style={{ 
            maxWidth: '1200px', 
            margin: '0 auto', 
            padding: '0 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button
                onClick={() => {
                  if (tipoUsuario === 'admin') {
                    setTela('dashboard-admin');
                  } else if (tipoUsuario === 'gerencia') {
                    setTela('dashboard-gerencia');
                  }
                  setViagemDetalhada(null);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  color: '#6b7280',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                <ArrowLeft size={20} />
                <span>Voltar</span>
              </button>
              <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>
                Detalhes da Viagem
              </h1>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ color: '#6b7280' }}>Olá, {usuarioLogado}</span>
              <button
                onClick={logout}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  color: '#dc2626',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                <LogOut size={20} />
                <span>Sair</span>
              </button>
            </div>
          </div>
        </header>

        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '24px' }}>
          {viagemDetalhada && (
            <div style={{ 
              backgroundColor: 'white', 
              borderRadius: '12px', 
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)', 
              overflow: 'hidden'
            }}>
              {/* Cabeçalho da viagem */}
              <div style={{ 
                backgroundColor: viagemDetalhada.temProblemas ? '#fee2e2' : '#f0f9ff',
                padding: '24px',
                borderBottom: '1px solid #e5e7eb'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h2 style={{ 
                    fontSize: '24px', 
                    fontWeight: 'bold', 
                    color: viagemDetalhada.temProblemas ? '#991b1b' : '#0369a1',
                    margin: 0
                  }}>
                    Viagem #{viagemDetalhada.id}
                  </h2>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px',
                    backgroundColor: viagemDetalhada.temProblemas ? '#dc2626' : '#059669',
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}>
                    {viagemDetalhada.temProblemas ? (
                      <>
                        <AlertTriangle size={16} />
                        <span>Com Ocorrências</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle size={16} />
                        <span>Concluída</span>
                      </>
                    )}
                  </div>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                  <div>
                    <span style={{ fontSize: '14px', color: '#6b7280', display: 'block' }}>Data e Hora</span>
                    <span style={{ fontSize: '16px', fontWeight: '500' }}>{viagemDetalhada.dataHora}</span>
                  </div>
                  <div>
                    <span style={{ fontSize: '14px', color: '#6b7280', display: 'block' }}>Motorista</span>
                    <span style={{ fontSize: '16px', fontWeight: '500' }}>{viagemDetalhada.motorista}</span>
                  </div>
                  <div>
                    <span style={{ fontSize: '14px', color: '#6b7280', display: 'block' }}>Veículo</span>
                    <span style={{ fontSize: '16px', fontWeight: '500' }}>{viagemDetalhada.prefixo}</span>
                  </div>
                  <div>
                    <span style={{ fontSize: '14px', color: '#6b7280', display: 'block' }}>KM Percorridos</span>
                    <span style={{ fontSize: '16px', fontWeight: '500' }}>{viagemDetalhada.kmPercorridos} km</span>
                  </div>
                </div>
              </div>

              {/* Informações da rota */}
              <div style={{ padding: '24px', borderBottom: '1px solid #e5e7eb' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#374151', marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
                  <MapPin style={{ marginRight: '8px' }} size={20} />
                  Informações da Rota
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: '16px' }}>
                  <div style={{ 
                    padding: '16px', 
                    backgroundColor: '#f9fafb', 
                    borderRadius: '8px',
                    textAlign: 'center'
                  }}>
                    <span style={{ fontSize: '14px', color: '#6b7280', display: 'block' }}>Origem</span>
                    <span style={{ fontSize: '16px', fontWeight: '500' }}>{viagemDetalhada.origem}</span>
                  </div>
                  <div style={{ color: '#6b7280' }}>→</div>
                  <div style={{ 
                    padding: '16px', 
                    backgroundColor: '#f9fafb', 
                    borderRadius: '8px',
                    textAlign: 'center'
                  }}>
                    <span style={{ fontSize: '14px', color: '#6b7280', display: 'block' }}>Destino</span>
                    <span style={{ fontSize: '16px', fontWeight: '500' }}>{viagemDetalhada.destino}</span>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
                  <div style={{ 
                    padding: '16px', 
                    backgroundColor: '#f9fafb', 
                    borderRadius: '8px'
                  }}>
                    <span style={{ fontSize: '14px', color: '#6b7280', display: 'block' }}>KM Inicial</span>
                    <span style={{ fontSize: '16px', fontWeight: '500' }}>{viagemDetalhada.kmInicial}</span>
                  </div>
                  <div style={{ 
                    padding: '16px', 
                    backgroundColor: '#f9fafb', 
                    borderRadius: '8px'
                  }}>
                    <span style={{ fontSize: '14px', color: '#6b7280', display: 'block' }}>KM Final</span>
                    <span style={{ fontSize: '16px', fontWeight: '500' }}>{viagemDetalhada.kmFinal}</span>
                  </div>
                </div>
              </div>

              {/* Checklist */}
              <div style={{ padding: '24px', borderBottom: '1px solid #e5e7eb' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#374151', marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
                  <Settings style={{ marginRight: '8px' }} size={20} />
                  Checklist de Verificação
                </h3>
                <div style={{ display: 'grid', gap: '12px' }}>
                  {viagemDetalhada.checklist.map((item, index) => (
                    <div key={index} style={{ 
                      padding: '16px', 
                      backgroundColor: item.status === 'nao-conforme' ? '#fef2f2' : '#f0f9ff',
                      borderRadius: '8px',
                      border: item.status === 'nao-conforme' ? '1px solid #fecaca' : '1px solid #bae6fd'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontWeight: '500' }}>{item.item}</span>
                          {item.obrigatorio && (
                            <span style={{
                              backgroundColor: '#fef2f2',
                              color: '#991b1b',
                              padding: '2px 8px',
                              borderRadius: '12px',
                              fontSize: '12px'
                            }}>
                              Obrigatório
                            </span>
                          )}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{
                            padding: '4px 12px',
                            borderRadius: '16px',
                            fontSize: '12px',
                            fontWeight: '500',
                            backgroundColor: item.status === 'conforme' ? '#dcfce7' : '#fef2f2',
                            color: item.status === 'conforme' ? '#166534' : '#991b1b'
                          }}>
                            {item.status === 'conforme' ? 'Conforme' : 'Não Conforme'}
                          </span>
                          {item.foto && (
                            <div style={{
                              padding: '4px',
                              backgroundColor: '#dbeafe',
                              borderRadius: '4px',
                              color: '#1e40af'
                            }}>
                              <Camera size={16} />
                            </div>
                          )}
                        </div>
                      </div>
                      {item.observacao && (
                        <div style={{ 
                          marginTop: '8px',
                          padding: '8px',
                          backgroundColor: '#fee2e2',
                          borderRadius: '4px',
                          borderLeft: '4px solid #dc2626'
                        }}>
                          <span style={{ fontSize: '14px', color: '#991b1b' }}>
                            <strong>Observação:</strong> {item.observacao}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Diversidades e OS */}
              {(viagemDetalhada.diversidades || viagemDetalhada.ordemServico) && (
                <div style={{ padding: '24px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#374151', marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
                    <AlertTriangle style={{ marginRight: '8px' }} size={20} />
                    Ocorrências e Serviços
                  </h3>
                  
                  {viagemDetalhada.diversidades && (
                    <div style={{ 
                      marginBottom: '16px',
                      padding: '16px',
                      backgroundColor: '#fffbeb',
                      borderRadius: '8px',
                      border: '1px solid #fed7aa'
                    }}>
                      <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#92400e', marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                        <FileText style={{ marginRight: '6px' }} size={16} />
                        Diversidades da Viagem
                      </h4>
                      <p style={{ fontSize: '14px', color: '#92400e', margin: 0, lineHeight: '1.5' }}>
                        {viagemDetalhada.diversidades}
                      </p>
                    </div>
                  )}
                  
                  {viagemDetalhada.ordemServico && (
                    <div style={{ 
                      padding: '16px',
                      backgroundColor: '#fef2f2',
                      borderRadius: '8px',
                      border: '1px solid #fecaca'
                    }}>
                      <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#991b1b', marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                        <Wrench style={{ marginRight: '6px' }} size={16} />
                        Ordem de Serviço
                      </h4>
                      <p style={{ fontSize: '14px', color: '#991b1b', margin: 0, lineHeight: '1.5' }}>
                        {viagemDetalhada.ordemServico}
                      </p>
                      {tipoUsuario === 'manutencao' && (
                        <div style={{ marginTop: '12px' }}>
                          <button
                            onClick={() => {
                              // Simular liberação do veículo após manutenção
                              alert('Ordem de serviço processada! Veículo liberado para uso.');
                            }}
                            style={{
                              backgroundColor: '#059669',
                              color: 'white',
                              padding: '8px 16px',
                              border: 'none',
                              borderRadius: '4px',
                              fontSize: '14px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                          >
                            <CheckCircle size={16} />
                            Processar OS
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
};

export default App;

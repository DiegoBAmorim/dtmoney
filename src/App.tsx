import Modal from "react-modal";

import { useState } from "react";
import { GlobalStyle } from "./styles/global";
import { Header} from './components/Header';
import { Dashboard } from "./components/Dashboard";

Modal.setAppElement('#root')
export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen]= useState(false);

  function handleOpenNewTransactionModal(){
    setIsNewTransactionModalOpen(true)
  }
  function handleCloseNewTransactionModal(){
    setIsNewTransactionModalOpen(false)
  }
  return (
    <>
     <Header onOpenNewTransactionModal={handleOpenNewTransactionModal}/>
     <Dashboard />
     <GlobalStyle />
     <Modal
      isOpen={isNewTransactionModalOpen}
      onRequestClose={handleCloseNewTransactionModal}
        >
      <h2>Cadastrar transação</h2>
      </Modal>
    </>
  );
}

export default App;

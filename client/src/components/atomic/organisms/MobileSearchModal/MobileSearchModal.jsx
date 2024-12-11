import './MobileSearchModal.css'
import { Modal } from '../../../../common/Modal'
import SearchBar from '../../molecules/SearchBar/SearchBar'

export const MobileSearchModal = ({ isModalOpen, setIsModalOpen, isOpenSearch }) => {
    return (
        <div className='mobile-search-modal'>
            <Modal isOpenSearch={isOpenSearch} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h3>ПОШУК</h3>
                <SearchBar setIsModalOpen={setIsModalOpen}/>
            </Modal>
        </div>
    )
}
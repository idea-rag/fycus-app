import ModalContainer from '@/components/general/Modal'

export default function TaskModal({isVisible, onClose, children}: any) {
    return (
        <ModalContainer isVisible={isVisible} onClose={onClose}>
            {children}
        </ModalContainer>
    )
}
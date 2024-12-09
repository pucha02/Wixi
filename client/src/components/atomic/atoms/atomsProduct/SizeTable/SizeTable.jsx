import './SizeTable.css'

export const SizeTable = ({handleViewTable}) => {
    return(
        <div className='size-table-btn' onClick={handleViewTable}>
            ТАБЛИЦЯ РОЗМІРІВ
        </div>
    )
}
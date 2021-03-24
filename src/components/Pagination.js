import styles from '../styles/components/Pagination.module.css'

export default function Pagination ( { gotoNextPage, gotoPrevPage }){
    return (
        <div className={styles.paginationContainer}>
            <button onClick={gotoPrevPage}>Previous Page</button>
            <button onClick={gotoNextPage}>Next Page</button>
        </div>
    )
}
import React from 'react';

function pageHref(num) {
    return `#page-${num + 1}`
}

export class Paginator extends React.Component {
    handlePrevious(e) {
        e.preventDefault()
        this.props.onPageChange(this.props.currentPage - 1)
    }

    handleNext(e) {
        e.preventDefault()
        this.props.onPageChange(this.props.currentPage + 1);
    }

    handlePageButton(page, e) {
        e.preventDefault();
        this.props.onPageChange(page);
    }

    renderPrevious() {
        if (this.props.currentPage > 0) {
            return (<li className="page-item"><a className="page-link" href={pageHref(this.props.currentPage - 1)} onClick={this.handlePrevious.bind(this)}>Previous</a></li>);
        }
    }

    renderNext() {
        if (this.props.currentPage < this.props.numPages - 1) {
            return (<li className="page-item"><a className="page-link" href={pageHref(this.props.currentPage + 1)} onClick={this.handleNext.bind(this)}>Next</a></li>);
        }
    }

    renderPageButton(className, pageNum) {
        return (<li className={`page-item ${className}`}><a className="page-link" onClick={this.handlePageButton.bind(this, pageNum)} href={pageHref(pageNum)}>{pageNum + 1}</a></li>);
    }

    render() {
        if (typeof this.props.colSpan === 'undefined') {
            throw new TypeError('Must pass a colSpan argument to Paginator');
        }

        if (typeof this.props.numPages === 'undefined') {
            throw new TypeError('Must pass a non-zero numPages argument to Paginator');
        }

        if (typeof this.props.currentPage === 'undefined') {
            throw new TypeError('Must pass a currentPage argument to Paginator');
        }

        let pageButtons = [];
        let pageButtonLimit = this.props.pageButtonLimit;
        let currentPage = this.props.currentPage;
        let numPages = this.props.numPages;
        let lowerHalf = Math.round(pageButtonLimit / 2);
        let upperHalf = (pageButtonLimit - lowerHalf);

        for (let i = 0; i < this.props.numPages; i++) {
            let showPageButton = false;
            let pageNum = i;
            let className = "reactable-page-button";
            if (currentPage === i) {
                className += " reactable-current-page";
            }
            pageButtons.push(this.renderPageButton(className, pageNum));
        }

        if (currentPage - pageButtonLimit + lowerHalf > 0) {
            if (currentPage > numPages - lowerHalf) {
                pageButtons.splice(0, numPages - pageButtonLimit)
            } else {
                pageButtons.splice(0, currentPage - pageButtonLimit + lowerHalf);
            }
        }

        if ((numPages - currentPage) > upperHalf) {
            pageButtons.splice(pageButtonLimit, pageButtons.length - pageButtonLimit);
        }

        return (
            <nav aria-label="Navigation">
                <ul className="pagination">
                    {this.renderPrevious()}
                    {pageButtons}
                    {this.renderNext()}
                </ul>
            </nav>
        );
    }
};


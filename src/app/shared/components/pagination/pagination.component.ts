import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  private _page: number = 0;
  private _visiblePages: number = 3;
  private _totalItems: number = 0;
  private _itemsPerPage: number = 10;

  public pages: number[] = [];
  public totalPages: number = 0;

  @Input()
  public get visiblePages() { return this._visiblePages; }
  public set visiblePages(val: number) {
    if (!val || val < 3) {
      this._visiblePages = 3;
    } else if (val > this.totalPages) {
      this._visiblePages = this.totalPages;
    } else {
      this._visiblePages = val;
    }
    this.calculateVisiblePages();
  }
  @Input()
  public get page() { return this._page; }
  public set page(val: number) {
    if (!val || val < 0) {
      this._page = 0;
      this.pageChange.emit(this.page);
    } else if (val > this.totalPages) {
      this._page = this.totalPages;
      this.pageChange.emit(this.page);
    } else {
      this._page = val;
    }
    this.calculateVisiblePages();
  }
  @Input()
  public get totalItems() { return this._totalItems; }
  public set totalItems(val: number) {
    this.page = 0;
    this._totalItems = !val || val < 0 ? 0 : val;
    this.setTotalPages();
  }
  @Input()
  public get itemsPerPage() { return this._itemsPerPage; }
  public set itemsPerPage(val: number) {
    this.page = 0;
    this._itemsPerPage = !val || val < 0 ? 0 : val;
    this.setTotalPages();
  }
  @Output() public pageChange = new EventEmitter<number>();


  constructor() { }

  ngOnInit(): void {
  }

  private setTotalPages() {
    this.totalPages = Math.ceil(this.totalItems / (this.itemsPerPage || Infinity));
  }

  private calculateVisiblePages() {
    const minPage = this.visiblePages % 2
    ? this.page - ((this.visiblePages - 1) / 2)
    : this.page - ((this.visiblePages / 2) - 1);
    const maxPage = this.visiblePages % 2
    ? this.page + ((this.visiblePages - 1) / 2)
    : this.page + ((this.visiblePages / 2));
    console.log(this.totalPages, minPage, maxPage, this.totalItems, this.itemsPerPage, this.pages);
    this.pages = Array.from(new Array(this.totalPages || 1))
    .map((_, idx) => idx)
    .slice(minPage, maxPage + 1);
  }
}

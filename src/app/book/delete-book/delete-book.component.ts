import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BookService} from '../../service/book/book.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Book} from '../../model/book';
import {NotificationService} from '../../service/notification/notification.service';

@Component({
  selector: 'app-delete-book',
  templateUrl: './delete-book.component.html',
  styleUrls: ['./delete-book.component.css']
})
export class DeleteBookComponent implements OnInit {
  book: Book = {};

  bookForm: FormGroup = new FormGroup({
    id: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
    author: new FormControl('', [Validators.required]),
    description: new FormControl('', Validators.required)
  });
  constructor(private bookService: BookService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private notificationService: NotificationService) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = +paramMap.get('id');
      this.getBookById(id);
    });
  }

  get idControl() {
    return this.bookForm.get('id');
  }

  get titleControl() {
    return this.bookForm.get('title');
  }

  get authorControl() {
    return this.bookForm.get('author');
  }

  get descriptionControl() {
    return this.bookForm.get('description');
  }
  getBookById(id: number) {
    this.bookService.getById(id).subscribe(bookBE => {
      this.book = bookBE;
      this.idControl.setValue(this.book.id);
      this.titleControl.setValue(this.book.title);
      this.authorControl.setValue(this.book.author);
      this.descriptionControl.setValue(this.book.description);
    });
  }

  ngOnInit() {
  }

  submit() {
    if (this.bookForm.valid) {
      this.bookService.deleteBook(this.book.id).subscribe(() => {
        this.notificationService.showMessage('success', 'Xóa thành công!');
      }, error => {
        this.notificationService.showMessage('error', 'Xóa lỗi!');
      });
    }else {
      this.notificationService.showMessage('error', 'Xóa lỗi!');
    }
    this.router.navigateByUrl('/books');
  }
}

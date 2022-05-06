import { Component, OnInit } from '@angular/core';
import {Book} from '../../model/book';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BookService} from '../../service/book/book.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {NotificationService} from '../../service/notification/notification.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

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
      this.bookService.updateBook(this.book.id, this.bookForm.value).subscribe(() => {
        this.notificationService.showMessage('success', 'Chỉnh sửa thành công!');
      }, error => {
        this.notificationService.showMessage('error', 'Chỉnh sửa lỗi!');
      });
    }else {
      this.notificationService.showMessage('error', 'Chỉnh sửa lỗi!');
    }
    this.router.navigateByUrl('/books');
  }

}

import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BookService} from '../../service/book/book.service';
import {NotificationService} from '../../service/notification/notification.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css']
})
export class CreateBookComponent implements OnInit {
  bookForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });
  constructor(private bookService: BookService,
              private notificationService: NotificationService,
              private router: Router) { }

  get title() {
    return this.bookForm.get('title');
  }

  get author() {
    return this.bookForm.get('author');
  }

  get description() {
    return this.bookForm.get('description');
  }

  ngOnInit() {
  }

  createBook() {
    if (this.bookForm.valid) {
      this.bookService.createBook(this.bookForm.value).subscribe(() => {
        this.notificationService.showMessage('success', 'Tạo thành công!');
      }, error => {
        this.notificationService.showMessage('error', 'Tạo lỗi!');
      });
    }else {
      this.notificationService.showMessage('error', 'Tạo lỗi!');
    }
    this.router.navigateByUrl('/books');
  }


}

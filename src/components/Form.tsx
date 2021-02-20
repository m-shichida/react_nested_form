import React, { useState } from 'react';
import { Form, Button, Header as Heading, InputOnChangeData } from 'semantic-ui-react'

import { Author } from '../types/author';
import { Book } from '../types/book';

export const AuthorForm = (
  { author, addBookFormHandleClick, removeBookFormHandleClick, handleChange }:
  { author: Author, addBookFormHandleClick: () => void, removeBookFormHandleClick: () => void, handleChange: () => void }
) => {
  const [firstName, setFirstName] = useState(author.first_name);

  return (
    <Form style={{ width: '400px' }}>
      <Form.Group widths='equal'>
        <Form.Input fluid label='姓' placeholder='姓' value={firstName} onChange={(_, data: InputOnChangeData) => setFirstName(data.value)} />
        <Form.Input fluid label='名' placeholder='名' value={author.last_name} onChange={(_, data: InputOnChangeData) => handleChange()} />
      </Form.Group>
      <Heading as='h3'>書籍一覧</Heading>
      <div>
        {author.books_attributes.map((book, i) => (
          <div key={i} style={{ display: book._destroy ? 'none' : 'flex', justifyContent: 'space-around' }}>
            <Form.Input style={{ width: '350px' }} placeholder='書籍名' value={book.name} />
            <span>
              <Button
                circular
                icon={ i === 0 ? 'plus' : 'minus'}
                color={ i === 0 ? 'blue' : 'red'}
                size='mini'
                style={{ verticalAlign: '-8px' }}
                onClick={() => i === 0 ? addBookFormHandleClick() : removeBookFormHandleClick()}
              />
            </span>
          </div>
        ))}
      </div>
      <Button color='blue' floated='right'>
        送信
      </Button>
    </Form>
  );
}

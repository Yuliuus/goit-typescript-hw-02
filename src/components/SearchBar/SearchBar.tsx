import css from "./SearchBar.module.css";
import { FaSearch } from "react-icons/fa";
import { Field, Form, Formik } from "formik";

type SearchBarProps = {
  onSearch: (topic: string) => void;
};

export default function SearchBar({ onSearch }: SearchBarProps) {
  return (
    <header>
      <Formik
        initialValues={{ topic: "" }}
        onSubmit={(values, actions) => {
          onSearch(values.topic);
          actions.resetForm();
        }}
      >
        <Form className={css.searchBar}>
          <Field
            name="topic"
            className={css.searchInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <button className={css.searchBtn} type="submit">
            <FaSearch className={css.searchIcon} />
          </button>
        </Form>
      </Formik>
    </header>
  );
}
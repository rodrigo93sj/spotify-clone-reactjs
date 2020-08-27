import React, { useEffect } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as CategoriesActions } from "../../store/ducks/categories";

import { Container, Content, List, Category, CategoryLink } from "./styles.js";

import Loading from "../../components/Loading";

const Categories = ({ getCategoriesRequest, categories }) => {
  useEffect(() => {
    getCategoriesRequest();
  }, [getCategoriesRequest]);

  return (
    <>
      {!categories.data && categories.loading && (
        <Container loading>
          <Loading />
        </Container>
      )}
      {categories.data && categories.data.items && (
        <Container>
          <Content>
            <h3>Gêneros e momentos</h3>
            <hr></hr>
            <List>
              {categories.data.items.map((category, index) => (
                <Category key={index}>
                  <CategoryLink to={`/genre/${category.id}`}>
                    {category.icons.map((item, index) => (
                      <div
                        key={index}
                        style={{ backgroundImage: `url(${item.url})` }}
                      >
                        <span>{category.name}</span>
                      </div>
                    ))}
                  </CategoryLink>
                </Category>
              ))}
            </List>
          </Content>
        </Container>
      )}
    </>
  );
};

Categories.propTypes = {
  getCategoriesRequest: PropTypes.func.isRequired,
  categories: PropTypes.shape({
    data: PropTypes.shape({
      items: PropTypes.arrayOf(
        PropTypes.shape({
          icons: PropTypes.arrayOf(
            PropTypes.shape({
              url: PropTypes.string,
            })
          ),
          id: PropTypes.string,
          name: PropTypes.string,
        })
      ),
    }),
    loading: PropTypes.bool,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  categories: state.categories,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(CategoriesActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Categories);

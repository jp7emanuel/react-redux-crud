import React, { Component } from 'react';
import { connect } from 'react-redux';
import  { Link } from 'react-router';
import Loading from '../loadings';
import { requestStores } from '../../actions/store';

class StoreIndex extends Component {
  componentWillMount() {
    this.props.requestStores();
  }

  render() {
    const { stores, fetching } = this.props;

    if (fetching) {
      return <Loading />;
    }

    if (stores.length < 1) {
      return (
        <div className="container" style={{ marginTop: 40 }}>
          <div className="notification is-primary">
            Nenhuma loja cadastrada no momento. <Link to="/create" style={{color: 'white', textDecoration: 'underline' }} className="is-link">Clique aqui para cadastrar uma loja </Link>
          </div>
        </div>
      );
    }

    const renderList = stores.map((store, key) => {
      return (
        <tr key={store._id}>
          <td>{key+1}</td>
          <td>{store.name} </td>
          <td>{store.address} </td>
          <td>{store.telephone}</td>
        </tr>
      )
    });

    return (
      <section className="section">
        <div className="container">
          <h1 className="title">Lista de Lojas</h1>
          <hr/>

          <table className="table is-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Nome da Loja</th>
                <th>Endereço</th>
                <th>Telefone</th>
              </tr>
            </thead>
            <tbody>
              {renderList}
            </tbody>
          </table>
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    stores: state.stores.all,
    fetching: state.stores.fetching
  }
}

export default connect(mapStateToProps, { requestStores })(StoreIndex);

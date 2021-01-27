import axios from 'axios';
import React, {
  FC,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from 'react';

type Subscription = {
  id: number;
  email: string;
  provider: string;
  date: Date;
};

const convertTime = (time: Date) => {
  return new Date(time).toLocaleDateString().toString();
};

const Data: FC = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>();
  const [filteredSubscript, setFilteredSubscript] = useState<Subscription[]>();
  const [options, setOptions] = useState('date');
  const [inputValue, setInputValue] = useState('');

  const ref: MutableRefObject<{ providers: string[] }> = useRef({
    providers: [],
  });

  // fetching data
  useEffect(() => {
    axios.get('http://localhost:8000/customers').then((res) => {
      setSubscriptions(res.data);
      res.data &&
        setFilteredSubscript(
          res.data.sort((a: { date: Date }, b: { date: Date }) =>
            a.date > b.date ? -1 : 1
          )
        );
    });
  }, []);

  // searching by email
  useEffect(() => {
    const searchValues = filteredSubscript?.filter((item) => {
      if (item.email.includes(inputValue)) {
        return item;
      }
      return false;
    });
    inputValue && setFilteredSubscript(searchValues);
  }, [inputValue]);

  // getting all providers
  if (subscriptions) {
    const allProviders = subscriptions?.map((item) => item.provider);
    allProviders?.push('All');
    ref.current.providers = Array.from(new Set(allProviders));
  }

  // sorting data
  const sortData = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setOptions(value);

    if (!filteredSubscript) {
      return;
    }
    if (value === 'email') {
      setFilteredSubscript(
        filteredSubscript.sort((a, b) => (a.email > b.email ? 1 : -1))
      );
    } else {
      setFilteredSubscript(
        filteredSubscript.sort((a, b) => (a.date > b.date ? -1 : 1))
      );
    }
  };

  // filter data by email providers
  const filterData = (prov: string) => {
    if (prov === 'All') {
      setFilteredSubscript(subscriptions);
    } else {
      const filtered = subscriptions?.filter((item) => item.provider === prov);
      setFilteredSubscript(filtered);
    }
  };

  // deleting email
  const deleteEmail = (id: number) => {
    axios.delete(`http://localhost:8000/customers/${id}`);
    const deleted = filteredSubscript?.filter((item) => item.id !== id);
    setFilteredSubscript(deleted);
  };

  if (!filteredSubscript) {
    return <div>No data to show</div>;
  }

  return (
    <section>
      <div className="container container-fluid">
        <div className="row">
          <div className="col-xs-4">
            <h4>Filter by provider: </h4>
            {ref.current.providers.map((item) => {
              return (
                <button
                  type="button"
                  key={item}
                  onClick={() => filterData(item)}
                >
                  {item}
                </button>
              );
            })}
          </div>
          <div className="col-xs-4">
            <h4>Search by:</h4>
            <input
              type="text"
              placeholder="email..."
              className="mb-50"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
            />
          </div>
          <div className="col-xs-4">
            <h4>Sort by:</h4>
            <select
              value={options}
              onChange={(event) => sortData(event)}
              className="mb-15"
            >
              <option value="date">Date</option>
              <option value="email">Email</option>
            </select>
          </div>
          <div className="col-xs-12">
            <table>
              <thead>
                <tr>
                  <th>No</th>
                  <th>ID</th>
                  <th>Email</th>
                  <th>Provider</th>
                  <th>Date</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {!filteredSubscript[0] ? (
                  <tr>
                    <td colSpan={6}>Database is empty</td>
                  </tr>
                ) : (
                  filteredSubscript.map(({ id, email, provider, date }, i) => {
                    return (
                      <tr key={id}>
                        <td>{i + 1}</td>
                        <td>{id}</td>
                        <td>{email}</td>
                        <td>{provider}</td>
                        <td>{convertTime(date)}</td>
                        <td>
                          <button type="button" onClick={() => deleteEmail(id)}>
                            x
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Data;

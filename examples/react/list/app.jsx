var MyPage  = React.createClass({
  myData: [
    '1', '2', '3'
  ],

  render: function() {
    return (
      <Ons.Page>
        <Ons.List
          dataSource={this.myData} 
          renderHeader={() => <Ons.ListHeader>Numbers</Ons.ListHeader>}
          renderFooter={() => <Ons.ListItem>Footer</Ons.ListItem>}
          renderRow={(rowData) => <Ons.ListItem> {rowData} </Ons.ListItem>}
        />
      </Ons.Page>
    );
  }
});

ReactDOM.render(<MyPage />, document.getElementById('app'));

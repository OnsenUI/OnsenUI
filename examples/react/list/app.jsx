var MyPage  = React.createClass({
  myData: [
    '1', '2', '3'
  ],

  render: function() {
    return (
      <Ons.Page>
            <Ons.List dataSource={this.myData} renderRow={(rowData) => <Ons.ListItem> {rowData} </Ons.ListItem>}>
            </Ons.List>
          </Ons.Page>
            
            );
  }
});

ReactDOM.render(<MyPage />, document.getElementById('app'));

var MyPage  = React.createClass({
  myData: [
'1', '2', '3'
  ],
  render: function() {
    return (
      <OnsPage>
            <OnsList dataSource={this.myData} renderRow={(rowData) => <OnsListItem> {rowData} </OnsListItem>}>
            </OnsList>
          </OnsPage>
            
            );
  }
});

ReactDOM.render(<MyPage />, document.getElementById('app'));

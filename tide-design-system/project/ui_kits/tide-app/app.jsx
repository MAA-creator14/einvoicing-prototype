// app.jsx — entry: state machine for navigating between Tide app screens.

const { useState: useStateApp } = React;

function App() {
  const [tab, setTab] = useStateApp('Payments');
  const [route, setRoute] = useStateApp({ name: 'home' }); // home | admin | customers | addItem

  // syntactic sugar
  const go = (r) => setRoute(r);

  let screen;
  if (route.name === 'home' || tab === 'Home' || tab === 'Payments') {
    screen = <HomeScreen
      onAccountDetails={() => alert('Account details')}
      onSearch={() => alert('Search')}
      onChat={() => alert('Open support chat')}
    />;
  }
  if (tab === 'Admin') {
    screen = <AdminInvoicingScreen
      onCreateInvoice={() => go({ name: 'addItem' })}
      onCustomers={() => go({ name: 'customers' })}
      onSearch={() => alert('Search')}
      onChat={() => alert('Open support chat')}
    />;
  }
  if (tab === 'Sales') {
    screen = <PlaceholderTab name="Sales"/>;
  }
  if (tab === 'Finance') {
    screen = <PlaceholderTab name="Finance"/>;
  }
  // route overrides
  if (route.name === 'customers') {
    screen = <AddCustomerEmpty
      onBack={() => go({ name: 'home' })}
      onAdd={() => alert('Open add-customer form')}
      onImport={() => alert('Import contacts')}
    />;
  }
  if (route.name === 'addItem') {
    screen = <AddItemScreen
      onBack={() => go({ name: 'home' })}
      onConfirm={() => { alert('Item added'); go({ name: 'home' }); }}
    />;
  }

  return (
    <IOSDevice width={390} height={844}>
      <div style={{
        position: 'relative', width:'100%', height:'100%',
        display:'flex', flexDirection:'column',
        background: TIDE.bg, paddingTop: 56,
      }}>
        <div style={{ flex:1, overflow:'auto' }}>{screen}</div>
        <BottomNav active={tab} onSelect={(t) => { setTab(t); setRoute({ name: 'home' }); }}/>
      </div>
    </IOSDevice>
  );
}

function PlaceholderTab({ name }) {
  return (
    <div style={{
      background: TIDE.bg, minHeight: '100%', padding: '24px 16px',
      display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
    }}>
      <div style={{
        fontFamily: FONT, fontSize: 18, fontWeight: 700, color: TIDE.ink2,
      }}>{name} tab</div>
      <div style={{ fontFamily: FONT, fontSize: 14, color: TIDE.ink3, marginTop: 6, textAlign:'center', maxWidth: 240 }}>
        Wired but not rebuilt for this kit — try Payments or Admin.
      </div>
    </div>
  );
}

function Page() {
  return (
    <div style={{
      minHeight: '100vh', display:'flex', alignItems:'center', justifyContent:'center',
      background: '#EEF0F6',
      backgroundImage: 'radial-gradient(circle at 30% 20%, #F4F6FB 0%, #E3E7F2 70%)',
      padding: 24,
    }}>
      <App/>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Page/>);

import { useState } from 'react';

function App() {
  let totalDiemBon = 0;
  let totalDiemMuoi = 0;
  let totalTinChi = 0;
  let STT = 1;
  const [data, setData] = useState({
    diem: '',
    tinchi: '',
  });

  let diemThangBon;
  if (data.diem >= 8.5) {
    diemThangBon = 4;
  } else if (data.diem >= 7) {
    diemThangBon = 3;
  } else if (data.diem >= 5) {
    diemThangBon = 2;
  } else if (data.diem >= 3.5) {
    diemThangBon = 1;
  } else {
    diemThangBon = 0;
  }

  data.thangBon = diemThangBon;
  data.thangMuoi = data.diem;
  data.TichthangBon = diemThangBon * data.tinchi;
  data.TichthangMuoi = data.diem * data.tinchi;

  const handleInput = (e) => {
    e.persist();
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const [datas, setdatas] = useState([]);
 
  const [edit, setedit] = useState(datas);
  const handleClick = () => {
    if (data.diem != '' && data.tinchi != '') {
      setdatas(currentData => [...currentData, data]);
      setData({
        diem: '',
        tinchi: ''
      })
    }
  }
console.log(datas);

  datas.map(item => (
    totalDiemBon += parseInt(item.TichthangBon),
    totalDiemMuoi += parseFloat(item.TichthangMuoi),
    totalTinChi += parseInt(item.tinchi)
  ));


  var Result_HTML = "";
  if (totalDiemBon > 0) {
    Result_HTML = <div>
      <p>Tổng điểm thang 4= {totalDiemBon / totalTinChi}</p>
      <p>Tổng điểm thang 10= {totalDiemMuoi / totalTinChi}</p>
    </div>
  } else {
    Result_HTML = <div>
      <p className='text-center' style={{color: "red", fontWeight:"bold"}}>Chưa có môn học</p>
    </div>
  }


  const handleEdit = (e, idx) => {
    console.log(datas[idx])
  }

  const editClick = () => {

  }

  return (
    <div>
      <h1 className="text-center" style={{ color: "blue", marginTop: "10px" }}>Tính điểm trung bình học kỳ UTE - ĐN</h1>
      <label style={{ color: "blue" }}>Nhập điểm môn:</label>
      <input onChange={handleInput} name="diem" value={data.diem} type="number" className="form-control" placeholder="Nhập điểm môn....." />
      <br />
      <label style={{ color: "blue" }}>Nhập số tín chỉ:</label>
      <input onChange={handleInput} name="tinchi" value={data.tinchi} type="number" className="form-control" placeholder="Nhập số tín chỉ....." />
      <button onClick={handleClick} className="btn btn-primary mt-5">TÍNH ĐIỂM</button>

      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">STT</th>
            <th scope="col">Điểm</th>
            <th scope="col">Tín chỉ</th>
            <th scope="col">Điểm thang 4</th>
            <th>Chỉnh sửa</th>
            <th>Xóa</th>
          </tr>
        </thead>
        <tbody>
          {datas.map((itemm, idx) => (
            <tr key={idx}>
              <td>{STT++}</td>
              <td><input onChange={(e, idx) => handleEdit} type='number' name='diem' value={itemm.diem}/></td>
              <td><input name='tinchi' value={itemm.tinchi}/></td>
              <td><input value={itemm.thangBon}/></td>
              <td><button className='btn btn-primary'>Sửa</button></td>
              <td><button className='btn btn-danger'>Xóa</button></td>
            </tr>
          ))}

        </tbody>
      </table>

      <div className="card">
        <div className="card-body">
          {Result_HTML}
        </div>
      </div>
    </div>
  );
}

export default App;

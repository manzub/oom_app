import { MailUnreadOutline, TrashOutline } from "react-ionicons"

export default function NotificationItem({ item, callback }: { item: any, callback: Function }) {
  return (<div className="p-3 d-flex align-items-center justify-content-between bg-light border-bottom osahan-post-header" style={{ width: '100%' }}>
    <div className="font-weight-bold mr-3">
      <div className="text-truncate">FROM PAST YOU:</div>
      <div className="small">{decodeURIComponent(item.message)}</div>
    </div>
    <div className="ml-auto mb-auto">
      <div className="btn-group">
        <button onClick={() => callback()} type="button" className="btn btn-light btn-sm p-2 rounded dropdown-item">
          {item.is_read ? <TrashOutline title="Delete Item" width="20px" height="20px" /> : <MailUnreadOutline title="Mark as Read" width="20px" height="20px" />}
        </button>
      </div>
      <br />
      <div className="text-muted text-right pt-1">{item.diffDays}d</div>
    </div>
  </div>)
}
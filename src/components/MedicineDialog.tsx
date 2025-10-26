import { ExternalLink, X, Search } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface MedicineDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  medicineName: string;
}

export default function MedicineDialog({ open, onOpenChange, medicineName }: MedicineDialogProps) {
  const handleBuyClick = () => {
    const searchUrl = `https://s.taobao.com/search?q=${encodeURIComponent(medicineName + ' 阿里大药房')}`;
    window.open(searchUrl, '_blank');
    onOpenChange(false);
  };

  const handleSearchMore = () => {
    const searchUrl = `https://s.taobao.com/search?q=${encodeURIComponent(medicineName)}`;
    window.open(searchUrl, '_blank');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center text-lg">
            <span className="text-taobao-orange">💊</span>
            <span className="ml-2">{medicineName}</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="bg-gradient-to-r from-orange-50 to-green-50 p-4 rounded-lg border border-orange-200">
            <p className="text-sm text-gray-700 mb-2">
              <strong className="text-taobao-orange">购药提示:</strong>
            </p>
            <ul className="text-xs text-gray-600 space-y-1 list-disc list-inside">
              <li>请仔细阅读药品说明书</li>
              <li>处方药需凭医生处方购买</li>
              <li>如有疑问请咨询药师</li>
            </ul>
          </div>

          <div className="space-y-2">
            <Button
              onClick={handleBuyClick}
              className="w-full bg-taobao-orange hover:bg-taobao-orange-dark text-white h-11 text-sm"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              前往阿里大药房购买
            </Button>
            
            <Button
              onClick={handleSearchMore}
              variant="outline"
              className="w-full border-health-green text-health-green hover:bg-green-50 h-11 text-sm"
            >
              <Search className="w-4 h-4 mr-2" />
              查看更多同类药品
            </Button>
            
            <Button
              onClick={() => onOpenChange(false)}
              variant="ghost"
              className="w-full text-gray-600 hover:bg-gray-100 h-10 text-sm"
            >
              <X className="w-4 h-4 mr-2" />
              关闭
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
